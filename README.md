![Build Status](https://github.com/Panier-App/ZIMRA/actions/workflows/ci.yml/badge.svg)

# ZIMRA Fiscalisation

A type-safe and frictionless library for ZIMRA Fiscalisation allowing you create `ZIMRA Fiscal Invoices`, `Credit Notes` and `Debit Notes`. This library is the type-safe, light weight and frictionless implementation of the [Panier API](https://panier.app/api-documentation#tag/zimra-fiscalisation) ZIMRA Fiscalisation feature. Putting you as close as possible to the ZIMRA FDMS server but without having to worry about Signing Receipts, Hashing, Opening or Closing day. All of that is handled by our system.

> [!important]
> This library will require you to setup a [Panier](https://panier.app) account in order to go into production but we have **Test Credentials** that you can use to try out the system. These will be hitting the **ZIMRA FDMS Test Environment**

Now lets see some examples
## Create a ZIMRA Fiscal Tax Invoices
```typescript
import { type ZimraFiscalInvoiceDoc, CreatePanierClient } from "@panierapp/zimra"

// Test Credentials
const credentials = {
    APP_ID: "zNONt9bq1YASNqaYCkRks",
    API_KEY: "RaOnN6P9KjPxDm_khLmBqrMXcjlh0yITvVXfHCx2VfTsO5GykW7N_a3Bu53uKhCR"
}

// Create the Panier instance
const panier = new CreatePanierClient(credentials);

// Create the doc
const fiscalInvoiceBody: ZimraFiscalInvoiceDoc = {
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
}

const fiscalInvoice = await panier.createFiscalInvoice(fiscalInvoiceBody);
console.log(fiscalInvoice);

```

## Create a Fiscal Tax Invoice with customer details
```typescript
import { type ZimraFiscalInvoiceDoc, CreatePanierClient } from "@panierapp/zimra"

// Test Credentials
const credentials = {
    APP_ID: "zNONt9bq1YASNqaYCkRks",
    API_KEY: "RaOnN6P9KjPxDm_khLmBqrMXcjlh0yITvVXfHCx2VfTsO5GykW7N_a3Bu53uKhCR"
}

// Create the Panier instance
const panier = new CreatePanierClient(credentials);

// Create the doc
const fiscalInvoiceWithCustomerBody: ZimraFiscalInvoiceDoc = {
    invoice_number: 'INV000001', // If not provided a NanoID is used e.g XDVP07DIYQDO
    customer: {
        name: 'Luke Tawanda',
        phone: '0772000001', // Optional
        email: 'luke.tawanda@gmail.com', // Optional
        tin_number: '2000820000', // Optional
        vat_number: '220411600' // Optional
    },
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
}

const fiscalInvoiceWithCustomer = await panier.createFiscalInvoice(fiscalInvoiceWithCustomerBody)
console.log(fiscalInvoiceWithCustomer);

```

## Create a Credit Note
```typescript
import { type ZimraCreditNoteDoc, CreatePanierClient } from "@panierapp/zimra"

// Test Credentials
const credentials = {
    APP_ID: "zNONt9bq1YASNqaYCkRks",
    API_KEY: "RaOnN6P9KjPxDm_khLmBqrMXcjlh0yITvVXfHCx2VfTsO5GykW7N_a3Bu53uKhCR"
}

// Create the Panier instance
const panier = new CreatePanierClient(credentials);

// Create the doc
const creditNoteBody: ZimraCreditNoteDoc = {
    invoice_number: 'INV000001', 
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
}

const creditNote = await panier.createFiscalInvoice(creditNoteBody);
console.log(creditNote);

```

## Create a Debit Note
```typescript
import { type ZimraDebitNoteDoc, CreatePanierClient } from "@panierapp/zimra"

// Test Credentials
const credentials = {
    APP_ID: "zNONt9bq1YASNqaYCkRks",
    API_KEY: "RaOnN6P9KjPxDm_khLmBqrMXcjlh0yITvVXfHCx2VfTsO5GykW7N_a3Bu53uKhCR"
}

// Create the Panier instance
const panier = new CreatePanierClient(credentials);

// Create the doc
const debitNoteBody: ZimraDebitNoteDoc = {
    invoice_number: 'INV000001', 
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
}

const debitNote = await panier.createFiscalInvoice(debitNoteBody);
console.log(debitNote);

```

## Cold Starts
If you attempt to use
