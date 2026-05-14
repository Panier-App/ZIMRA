import type { Panier } from './types.js';
import { type FetchOptions, $fetch } from 'ofetch';
import { ProxyAgent, Agent } from 'undici';
import consola from "consola";

export type { Panier } from './types.js';

export class CreatePanierClient {
    private host: string;
    private proxy_url: string;
    private unsecured_proxy_agent: boolean;
    private APP_ID: string;
    private API_KEY: string;

    constructor(credentials: Panier.Credentials) {
        this.host = credentials.host;
        this.proxy_url = credentials?.proxy_url ?? '';
        this.unsecured_proxy_agent = credentials?.unsecured_proxy_agent ?? false;
        this.APP_ID = credentials.APP_ID;
        this.API_KEY = credentials.API_KEY;
    }

    getFetchOptions() {
        const options: FetchOptions<'json'> = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'app-id': this.APP_ID,
                'api-key': this.API_KEY,
            },
            ignoreResponseError: true,
            responseType: 'json'
        };

        if(this.proxy_url) {
            // Self-sign certificate
            if (this.unsecured_proxy_agent) {
                const unsecureAgent = new Agent({ connect: { rejectUnauthorized: false } });
                options.dispatcher = unsecureAgent;
            } else {
                const proxyAgent = new ProxyAgent(this.proxy_url);
                options.dispatcher = proxyAgent;
            }
        }

        return options;
    }

    /**
        This method is used to create a `ZIMRA Fiscal Tax Invoice`
        ```typescript
        // ... First Create Panier Client instance

        const fiscalInvoiceBody = { 
            // ... add Fiscal Invoice Body
        } satisfies Panier.CreateFiscalInvoiceBody

        const fiscal_invoice = await panier.createFiscalInvoice(fiscalInvoiceBody)
                                        .catch(error => error)

        // Now you can use the Fiscal Invoice in our app 
    ```
    */
    createFiscalInvoice(_body: Panier.CreateFiscalInvoiceBody) {
        const url = this.host + '/zimra/generic'
        const body = Object.assign({ type: 'Invoice' }, _body);
        const options = Object.assign({ body }, this.getFetchOptions());
        return $fetch<Panier.PanierClientResponse, 'json'>(url, options);
    }
}