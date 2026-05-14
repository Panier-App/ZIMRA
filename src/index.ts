import type { Panier } from './types.js';
import { type FetchOptions, $fetch } from 'ofetch';
import { ProxyAgent, Agent } from 'undici';

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

        return $fetch<Panier.CreateClientResponse, 'json'>(url, options);
    }

    /**
     * This method is used to create a `Credit Note`

        ```typescript
        // First Create Panier Client instance

        const creditNoteBody = {
        // add Credit Note Body
        } satisfies Panier.CreateCreditNoteBody;

        const credit_note = await panier.createCreditNote(creditNoteBody)
                                        .catch((error) => error);

        // Now you can use the Credit Note in our app
        ```
     */
    createCreditNote(_body: Panier.CreateCreditNoteBody) {
        const url = this.host + '/zimra/generic'
        const body = Object.assign({ type: 'Credit Note' }, _body);
        const options = Object.assign({ body }, this.getFetchOptions());

        return $fetch<Panier.CreateClientResponse, 'json'>(url, options);
    }

    /**
     * This method is used to create a `Debit Note`

        ```typescript
        // First Create Panier Client instance

        const debitNoteBody = {
        // ... add Debit Note Body
        } satisfies Panier.CreateDebitNoteBody;

        const debit_note = await panier.createDebitNote(debitNoteBody)
                                        .catch((error) => error);

        // Now you can use the Debit Note in our app
        ```
     */
    createDebitNote(_body: Panier.CreateCreditNoteBody) {
        const url = this.host + '/zimra/generic'
        const body = Object.assign({ type: 'Debit Note' }, _body);
        const options = Object.assign({ body }, this.getFetchOptions());

        return $fetch<Panier.CreateClientResponse, 'json'>(url, options);
    }

    /**
     * This method is used to find a `ZIMRA Fiscal Invoice` and it's associated `Credit Notes` and `Debit Notes`

        ```typescript
        // First Create Panier Client instance
        const invoice_number = 'INV000001';
        const getFiscalInvoice = await panier.find(invoice_number)
                                            .catch((error) => error);

        // Now you can use the Fiscal Invoice in our app
        ```
     */
    find(body: Panier.FindFiscalInvoiceBody) {
        const url = this.host + '/zimra/generic/find'
        const options = Object.assign({ body }, this.getFetchOptions());

        return $fetch<Panier.CreateClientResponse, 'json'>(url, options);
    }

    /**
     * This method will return return information about your fiscal device, that is, `Device ID`, `Device Serial Number`, `Fiscal Day`, `Device Status`, `Billing Status`, `Company Name`.

        ```typescript
        // First Create Panier Client instance

        const get_device_information = await panier.getDeviceInformation()
                                                    .catch((error) => error);

        // Now you can use the device information in our app
        ```
     */
    getDeviceInformation() {
        const url = this.host + '/zimra/generic/device-information'

        return $fetch<Panier.DeviceInformation, 'json'>(url, this.getFetchOptions());
    }

    /**
     * When your fiscal day is closed, [Panier](https://panier.app) automatically opens your fiscal day if you before performing any operation. However this method manually open your fiscal day.

        ```typescript
        // First Create Panier Client instance

        const open_day = await panier.openDay()
                                .catch((error) => error.data);

        // fiscalDayStatus options "FiscalDayOpened", "FiscalDayClosed", "FiscalDayCloseFailed", "FiscalDayCloseInitiated"
        if(open_day?.fiscalDayStatus === 'FiscalDayOpened') {
        // Do some operation now that your fiscal day is opened
        }
     */
    openDay() {
        const url = this.host + '/zimra/generic/open-day'
        const options = Object.assign({}, this.getFetchOptions());
        type OpenDayResponseData = { _message?: string, device_status?: Panier.ZimraDeviceStatus, error?: string };

        return $fetch<OpenDayResponseData, 'json'>(url, options);
    }

    /**
     * [Panier](https://panier.app) automatically closes your fiscal day 23 hours and 30 minutes after your fiscal day was opened. However this method allows you to manually close your fiscal day.

        ```typescript
        // ... First Create Panier Client instance

        const close_day = await panier.closeDay()
                                    .catch((error) => error);

        // fiscalDayStatus opitons "FiscalDayOpened", "FiscalDayClosed", "FiscalDayCloseFailed", "FiscalDayCloseInitiated"
        if(close_day?.fiscalDayStatus === 'FiscalDayClosed') {
        // Do some operation now that your fiscal day is closed
        }
        ```
     */
    closeDay() {
        const url = this.host + '/zimra/generic/close-day'
        const options = Object.assign({}, this.getFetchOptions());
        type CloseDayResponseData = { _message?: string, device_status?: Panier.ZimraDeviceStatus, error?: string };

        return $fetch<CloseDayResponseData, 'json'>(url, options);
    }
}