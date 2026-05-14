import { type Panier, CreatePanierClient } from "./index.js"
import consola from "consola"

// Test Credentials
  const options = {
    host: 'https://dev.panier.app/api/v1', // Use https://panier.app/api/v1 in production
    APP_ID: 'zNONt9bq1YASNqaYCkRks',
    API_KEY: 'RaOnN6P9KjPxDm_khLmBqrMXcjlh0yITvVXfHCx2VfTsO5GykW7N_a3Bu53uKhCR',
  } satisfies Panier.Credentials;

  // Create the Panier Client instance
  const panier = new CreatePanierClient(options);

  const fiscalInvoiceBody = {
  invoice_number: 'INV000002', // If not provided a NanoID is used e.g XDVP07DIYQDO
  products: [
    {
      name: 'Jumbo Ban',
      selling_price: 0.9, // Selling Price Excluding Tax
      quantity: 2,
      discount: 0, // Optional
      hs_code: '1905.90.00',
      zimra_tax_id: 517,
    },
  ],
  currency_code: 'USD',
  money_type: 'Cash',
} satisfies Panier.CreateFiscalInvoiceBody;

const fiscal_invoice = await panier.createFiscalInvoice(fiscalInvoiceBody)
                                .catch(error => consola.error(error))

if (fiscal_invoice?.created) {
  consola.log('You have successfully created a fiscal invoice');
  consola.log(fiscal_invoice);

  // Check for ZIMRA validation errors
  if (fiscal_invoice.created.validation_errors.length === 0) {
    consola.log('No validation Errors ');
  } else {
    consola.log(
      `You have ${fiscal_invoice.created.validation_errors.length} validation errors`,
    );
    consola.log(fiscal_invoice.created.validation_errors);
  }
} else {
  consola.log('Failed to create a fiscal invoice');
  consola.log(fiscal_invoice);
}