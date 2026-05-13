/**
 * import { type Panier, CreatePanierClient } from "@panierapp/zimra" 
import { consola } from "consola"

// Test Credentials
const options = {
    host: 'https://dev.panier.app/api/v1', // Use https://panier.app/api/v1 in production
    APP_ID: "zNONt9bq1YASNqaYCkRks",
    API_KEY: "RaOnN6P9KjPxDm_khLmBqrMXcjlh0yITvVXfHCx2VfTsO5GykW7N_a3Bu53uKhCR"
} satisfies Panier.Credentials

// Create the Panier Client instance
const panier = new CreatePanierClient(options);

// Create ZIMRA Fiscal Tax Invoice
// Create the body
const fiscalInvoiceBody = {
    invoice_number: 'INV000001', // If not provided a NanoID is used e.g XDVP07DIYQDO
    products: [
        {
            name: 'Jumbo Ban',
            selling_price: 0.9, // Selling Price Excluding Tax
            quantity: 2,
            discount: 0, // Optional
            hs_code: '1905.90.00',
            zimra_tax_id: 512
        }
    ],
    currency_code: "USD",
    money_type: "Cash"
} satisfies Panier.CreateFiscalInvoiceBody

panier.createFiscalInvoice(fiscalInvoiceBody)
    .then(data => consola.log(data))
    .catch(error => consola.error(error));
*/
