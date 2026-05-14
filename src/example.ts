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

const fiscalInvoiceWithCustomerBody = {
  invoice_number: 'INV000001', // If not provided a NanoID is used e.g XDVP07DIYQDO
  customer: {
    name: 'Luke Tawanda',
    phone: '0772000001',
    email: 'luke.tawanda@gmail.com',
    province: 'Mashonaland East', // Optional
    city: 'Marondera', // Optional
    street: 'Harare drive', // Optional
    house_no: '123', // Optional
    tin_number: '2000820000',
    vat_number: '220411600', // Optional
  },
  products: [
    {
      name: 'Jumbo Ban',
      selling_price: 0.9, // Selling Price Excluding Tax
      quantity: 2,
      discount: 0, // Optional
      hs_code: '1905.90.00',
      zimra_tax_id: 517, // See ZIMRA Tax ID Table for more optionals
    },
  ],
  currency_code: 'USD',
  money_type: 'Cash',
  receiptNotes: 'aksldjfalskdjf alkdjalskjd'
} satisfies Panier.CreateFiscalInvoiceBody;

const fiscal_invoice_with_customer = await panier.createFiscalInvoice(fiscalInvoiceWithCustomerBody)
                                                .catch(error => consola.error(error))

if(fiscal_invoice_with_customer?.created) {
  consola.log('You have successfully created a fiscal invoice');
  consola.log(fiscal_invoice_with_customer);

  // Check for ZIMRA validation errors
  if(fiscal_invoice_with_customer.created.validation_errors.length === 0) {
    consola.log('No validation Errors ');
  } else {
    consola.log(
      `You have ${ fiscal_invoice_with_customer.created.validation_errors.length } validation errors`,
    );
    consola.log(fiscal_invoice_with_customer.created.validation_errors);
  }
} else {
  consola.log('Failed to create a fiscal invoice');
  consola.log(fiscal_invoice_with_customer);
}