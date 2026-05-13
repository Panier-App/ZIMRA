![Build Status](https://github.com/Panier-App/ZIMRA/actions/workflows/ci.yml/badge.svg)

# ZIMRA Fiscalisation

A type-safe and frictionless library for ZIMRA Fiscalisation allowing you create `ZIMRA Fiscal Invoices`, `Credit Notes` and `Debit Notes` without having to worry about Hashing, Signing Receipts, Opening or Closing fiscal days. If you need more functionality please visit the [Panier Developer API](https://panier.app/api-documentation).

> [!IMPORTANT]
> This library will require you to setup a paid [Panier](https://panier.app) account in order to go into production but we have **Test Credentials** that you can use to try out the system and see if it's the best fit for your application. These will be hitting the **ZIMRA FDMS Test Environment**. Don't forget to switch your `host` to `https://panier.app/api/v1` when you are in production so that you can hit the **ZIMRA FDMS Production Environment**.

# Installation

```
npm install @panierapp/zimra
```

# Usage

## Create a Panier instance

First let us create a **Panier Client** instance

```typescript
import { type Panier, CreatePanierClient } from '@panierapp/zimra';

// Test Credentials
const options = {
  host: 'https://dev.panier.app/api/v1', // Use https://panier.app/api/v1 in production
  APP_ID: 'zNONt9bq1YASNqaYCkRks',
  API_KEY: 'RaOnN6P9KjPxDm_khLmBqrMXcjlh0yITvVXfHCx2VfTsO5GykW7N_a3Bu53uKhCR',
} satisfies Panier.Credentials;

// Create the Panier Client instance
const panier = new CreatePanierClient(options);
```

Now let's use our Panier Client instance to create a ZIMRA Fiscal Tax Invoice

## Create a ZIMRA Fiscal Tax Invoices

```typescript
/** ... First Create Panier Client instance */

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
      zimra_tax_id: 512,
    },
  ],
  currency_code: 'USD',
  money_type: 'Cash',
} satisfies Panier.CreateFiscalInvoiceBody;

const fiscal_invoice = await panier
  .createFiscalInvoice(fiscalInvoiceBody)
  .catch((error) => console.error(error));

if (fiscal_invoice?.id) {
  console.log('You have successfully created a fiscal invoice');
  console.log(fiscal_invoice);

  // Check for ZIMRA validation errors
  if (fiscal_invoice.validation_errors.length === 0) {
    console.log('No validation Errors ');
  } else {
    console.log(
      `You have ${fiscal_invoice.validation_errors.length} validation errors`,
    );
    console.log(fiscal_invoice.validation_errors);
  }
} else {
  console.log('Failed to create a fiscal invoice');
  console.log(fiscal_invoice);
}
```

Et voila, that's it 🎉.

# Create a Fiscal Tax Invoice with customer details

You can also add customer details to your fiscal tax invoice but you have to add their `Tin Number`, `Phone` and `Email` for their information to appear on the Buyer section of the ZIMRA Fiscal Tax Invoice.

```typescript
/** ... First Create Panier Client instance */

// Create the doc
const fiscalInvoiceWithCustomerBody = {
  invoice_number: 'INV000001', // If not provided a NanoID is used e.g XDVP07DIYQDO
  customer: {
    name: 'Luke Tawanda',
    phone: '0772000001',
    email: 'luke.tawanda@gmail.com',
    address: '123 Harare drive', // Optional
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
      zimra_tax_id: 512, // See ZIMRA Tax ID Table for more optionals
    },
  ],
  currency_code: 'USD',
  money_type: 'Cash',
} satisfies Panier.CreateFiscalInvoiceBody;

const fiscal_invoice_with_customer = await panier.createFiscalInvoice(
  fiscalInvoiceWithCustomerBody,
);
if (fiscal_invoice_with_customer?.id) {
  console.log('You have successfully created a fiscal invoice');
  console.log(fiscal_invoice_with_customer);

  // Check for ZIMRA validation errors
  if (fiscal_invoice_with_customer.validation_errors.length === 0) {
    console.log('No validation Errors ');
  } else {
    console.log(
      `You have ${fiscal_invoice_with_customer.validation_errors.length} validation errors`,
    );
    console.log(fiscal_invoice_with_customer.validation_errors);
  }
} else {
  console.log('Failed to create a fiscal invoice');
  console.log(fiscal_invoice_with_customer);
}
```

# Create a Credit Note

Now let us create a `Credit Note`.

```typescript
/** ... First Create Panier Client instance */

// Create the doc
const creditNoteBody = {
  invoice_number: 'INV000001', // The Invoice Number of the ZIMRA Fiscal Tax Invoice that you want to credit
  products: [
    {
      name: 'Jumbo Ban',
      selling_price: 0.9, // Selling Price Excluding Tax
      quantity: 2,
      discount: 0, // Optional
      hs_code: '1905.90.00',
      zimra_tax_id: 512, // See ZIMRA Tax ID Table for more optionals
    },
  ],
  currency_code: 'USD',
  money_type: 'Cash',
} satisfies Panier.CreateCreditNoteBody;

const credit_note = await panier
  .createCreditNote(creditNoteBody)
  .catch((error) => console.error(error));

if (credit_note?.id) {
  console.log('You have successfully created a credit note');
  console.log(credit_note);

  // Check for ZIMRA validation errors
  if (credit_note.validation_errors.length === 0) {
    console.log('No validation Errors ');
  } else {
    console.log(
      `You have ${credit_note.validation_errors.length} validation errors`,
    );
    console.log(credit_note.validation_errors);
  }
} else {
  console.log('Failed to create a credit note');
  console.log(credit_note);
}
```

## Create a Debit Note

Now let's create a Debit Note

```typescript
/** ... First Create Panier Client instance */

// Create the doc
const debitNoteBody = {
    invoice_number: 'INV000001', // The Invoice Number of the ZIMRA Fiscal Tax Invoice that you want to debit
    products: [
        {
            name: 'Jumbo Ban',
            selling_price: 0.9, // Selling Price Excluding Tax
            quantity: 2,
            discount: 0, // Optional
            hs_code: '1905.90.00',
            zimra_tax_id: 512 // See ZIMRA Tax ID Table for more optionals
        }
    ],
    currency_code: "USD",
    money_type: "Cash"
} satisfies Panier.CreateDebitNoteBody

const debit_note = await panier.createDebitNote(debitNoteBody);
                        .catch(error => console.error(error));

if(debit_note?.id) {
    console.log('You have successfully created a debit note')
    console.log(debit_note)

    // Check for ZIMRA validation errors
    if(debit_note.validation_errors.length === 0) {
        console.log('No validation Errors ')
    }
    else {
        console.log(`You have ${ debit_note.validation_errors.length } validation errors`)
        console.log(debit_note.validation_errors)
    }
}
else {
    console.log('Failed to create a debit note')
    console.log(zimraDebitNote)
}

```

# ZIMRA Tax IDs

Below are tables showing all the valid ZIMRA Tax IDs for the ZIMRA Test and Production Environments

> [!IMPORTANT]
> Take special care to check the tax IDs and please note that they are not always the same accross Environments

## Test Environment

<table>
    <thead>
        <tr><th>Name</th><th>Percentage (%)</th><th>ZIMRA Tax ID</th></tr>
    </thead>
    <tbody>
        <tr><td>Exempt</td><td></td><td>1</td></tr>
        <tr><td>Zero rated 0%</td><td>0</td><td>2</td></tr>
        <tr><td>Non-VAT Withholding Tax</td><td>5</td><td>514</td></tr>
        <tr><td>Standard rated 15.5%</td><td>15.5</td><td>517</td></tr>
    </tbody>
</table>

## Production Environment

<table>
    <thead>
        <tr><th>Name</th><th>Percentage (%)</th><th>ZIMRA Tax ID</th></tr>
    </thead>
    <tbody>
        <tr><td>Zero rated 0%</td><td>0</td><td>2</td></tr>
        <tr><td>Exempt</td><td></td><td>3</td></tr>
        <tr><td>Non-VAT Withholding Tax</td><td>5</td><td>514</td></tr>
        <tr><td>Standard rated 15.5%</td><td>15.5</td><td>515</td></tr>
    </tbody>
</table>

# Proxy Support

If you want to use a proxy all you have to do is add a `proxy_url` when you are creating the `Panier Client` instance.

## Node.js

In Node.js (>= 18)

```typescript
import { type Panier, CreatePanierClient } from '@panierapp/zimra';

const options = {
  host: 'https://panier.app/api/v1',
  proxy_url: 'http://localhost:3128', // 👈 Add the proxy_url
  APP_ID: '******',
  API_KEY: '******',
} satisfies Panier.Credentials;

// Create the Panier Client instance
const panier = new CreatePanierClient(options);

/** Now you can use the proxied instance in your app */
```

## Example: Allow self-signed certificates (USE AT YOUR OWN RISK!)

> [!NOTE]
> This makes fetch unsecure against MITM attacks. USE AT YOUR OWN RISK!

```typescript
import { type Panier, CreatePanierClient } from '@panierapp/zimra';

const options = {
  host: 'https://panier.app/api/v1',
  proxy_url: 'http://localhost:3128', // 👈 Add the proxy_url
  unsecured_proxy_agent: true, // 👈 Set the unsecured_proxy_agent to true
  APP_ID: '******',
  API_KEY: '******',
} satisfies Panier.Credentials;

// Create the Panier Client instance
const panier = new CreatePanierClient(options);

/** Now you can use the proxied instance in your app */
```

# Caveats

## 1. Cold Starts

If you try to create a `ZIMRA Fiscal Tax Invoice`, `Credit Note` or `Debit Note` when your fiscal day is closed, [Panier](https://panier.app) will first open your fiscal day then perform the operation. This will add a delay to the overlay operation. However once the fiscal day has been opened the execution time will reduce and return to normal.

## 2. Invoice Number Collisions

The ZIMRA FDMS requires that all invoice_numbers be unique for a single tax payer. Meaning that if you were using another fiscal device before, you can not use the same invoice numbers that you used on that device with this library. You you do, ZIMRA will return a `RCPT020` error code which means `Invoice signature is not valid`. This will prevent your fiscal day from beign able to close and you would have to send an email to `csimango@zimra.co.zw` and `gsangare@zimra.co.zw` requesting that your fiscal day be manually closed on the ZIMRA side. You must include your `Company Name`, `Device ID` and current `Fiscal Day` in your email.

# Methods

## `createFiscalInvoice()`

This method is used to create a `ZIMRA Fiscal Tax Invoice`

```typescript
/** ... First Create Panier Client instance */

const fiscalInvoiceBody = {
  /** ... add Fiscal Invoice Body */
} satisfies Panier.CreateFiscalInvoiceBody;

const fiscal_invoice = await panier
  .createFiscalInvoice(fiscalInvoiceBody)
  .catch((error) => error);

/** Now you can use the Fiscal Invoice in our app */
```

## `createCreditNote()`

This method is used to create a `Credit Note`

```typescript
/** ... First Create Panier Client instance */

const creditNoteBody = {
  /** ... add Credit Note Body */
} satisfies Panier.CreateCreditNoteBody;

const credit_note = await panier
  .createCreditNote(creditNoteBody)
  .catch((error) => error);

/** Now you can use the Credit Note in our app */
```

## `createDebitNote()`

This method is used to create a `Debit Note`

```typescript
/** ... First Create Panier Client instance */

const debitNoteBody = {
  /** ... add Debit Note Body */
} satisfies Panier.CreateDebitNoteBody;

const debit_note = await panier
  .createDebitNote(debitNoteBody)
  .catch((error) => error);

/** Now you can use the Debit Note in our app */
```

## `find()`

This method is used to find a `ZIMRA Fiscal Invoice` and it's associated `Credit Notes` and `Debit Notes`

```typescript
/** ... First Create Panier Client instance */
const invoice_number = 'INV000001';
const getFiscalInvoice = await panier
  .find(invoice_number)
  .catch((error) => error);

/** Now you can use the Fiscal Invoice in our app */
```

## `getDeviceInformation()`

This method will return return information about your fiscal device, that is, `Device ID`, `Device Serial Number`, `Fiscal Day`, `Device Status`, `Billing Status`, `Company Name`.

```typescript
/** ... First Create Panier Client instance */

const get_device_information = await panier
  .getDeviceInformation()
  .catch((error) => error);

/** Now you can use the device information in our app */
```

## `openDay()`

When your fiscal day is closed, [Panier](https://panier.app) automatically opens your fiscal day if you before performing any operation. However this method manually open your fiscal day.

```typescript
/** ... First Create Panier Client instance */

const open_day = await panier.openDay().catch((error) => error);

// fiscalDayStatus options "FiscalDayOpened", "FiscalDayClosed", "FiscalDayCloseFailed", "FiscalDayCloseInitiated"
if (open_day?.fiscalDayStatus === 'FiscalDayOpened') {
  /** Do some operation now that your fiscal day is opened **/
}
```

## `closeDay()`

[Panier](https://panier.app) automatically closes your fiscal day 23 hours and 30 minutes after your fiscal day was opened. However this method allows you to manually close your fiscal day.

```typescript
/** ... First Create Panier Client instance */

const close_day = await panier.closeDay().catch((error) => error);

// fiscalDayStatus opitons "FiscalDayOpened", "FiscalDayClosed", "FiscalDayCloseFailed", "FiscalDayCloseInitiated"
if (close_day?.fiscalDayStatus === 'FiscalDayClosed') {
  /** Do some operation now that your fiscal day is closed **/
}
```

# Schemas

## `Credentials`

| Name                    | Type    | Required | Options                                                      | Description                                                                                                                                |
| ----------------------- | ------- | -------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `host`                  | string  | `Yes`    | `https://panier.app/api/v1`, `https://dev.panier.app/api/v1` | Determines whether you are in the ZIMRA Test Environment or Production Environment                                                         |
| `proxy_url`             | string  | `No`     |                                                              | Proxy URL for added Proxy support                                                                                                          |
| `unsecured_proxy_agent` | boolean | `No`     |                                                              | Allows you to self-signed certificates when using the `proxy_url`. This makes fetch unsecure against MITM attacks (USE AT YOUR OWN RISK!). |
| `APP_ID`                | string  |          | `Yes`                                                        |                                                                                                                                            |
| `API_KEY`               | string  |          | `Yes`                                                        |                                                                                                                                            |

## `Product`

| Name            | Type   | Required | Max Length | Description                                                                                                                                                                                                                     |
| --------------- | ------ | -------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`          | string | `Yes`    | 190        | Product name                                                                                                                                                                                                                    |
| `selling_price` | number | `Yes`    |            | Product selling price excluding tax                                                                                                                                                                                             |
| `quantity`      | number | `Yes`    |            | Number of units being sold                                                                                                                                                                                                      |
| `discount`      | number | `No`     |            | Discount amount being applied for the line item                                                                                                                                                                                 |
| `hs_code`       | string | `Yes`    | 10         | The unique Harmonized System Code of the product. [What is a HS Code?](https://www.zimra.co.zw/news/2308-use-of-harmonized-system-codes-hs-codes-under-domestic-taxes-in-recording-of-sales-transactions-using-fiscal-devices). |
| `zimra_tax_id`  | number | `Yes`    |            | ZIMRA Tax ID. See the **ZIMRA Tax ID section** for more information                                                                                                                                                             |

## `Customer`

| Name         | Type   | Required | Max Length | Description               |
| ------------ | ------ | -------- | ---------- | ------------------------- |
| `name`       | string | `Yes`    | 190        | Customer name             |
| `email`      | string | `Yes`    | 190        | Customer email address    |
| `phone`      | string | `Yes`    | 20         | Customer phone number     |
| `address`    | string | `No`     | 190        | Customer physical address |
| `tin_number` | string | `Yes`    | 20         | Customer ZIMRA Tin Number |
| `vat_number` | string | `No`     | 20         | Customer ZIMRA VAT Number |

## `CreateZimraFiscalInvoiceBody`

| Name             | Type        | Required | Max Length | Options                                                                     | Description                                                                                               |
| ---------------- | ----------- | -------- | ---------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `invoice_number` | string      | `No`     | 50         |                                                                             | The unique identifier of the ZIMRA Fiscal Tax Invoice. If not provided a NanoID is used e.g XDVP07DIYQDO. |
| `customer`       | `Customer`  | `No`     |            |                                                                             | Customer details                                                                                          |
| `products`       | `Product[]` | `Yes`    | 1000       |                                                                             | List of products on the ZIMRA Fiscal Tax Invoice                                                          |
| `currency_code`  | string      | `Yes`    |            |                                                                             | This is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) Currency Code e.g ZWG or USD               |
| `money_type`     | string      | `Yes`    |            | `Cash`, `Card`, `MobileWallet`, `Coupon`, `Credit`, `BankTransfer`, `Other` | Payment method that your customer paid for the ZIMRA Fiscal Tax Invoice                                   |

## `CreateCreditNoteBody`

| Name             | Type        | Required | Max Length | Options                                                                     | Description                                                                                  |
| ---------------- | ----------- | -------- | ---------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `invoice_number` | string      | `Yes`    | 50         |                                                                             | The invoice number of the ZIMRA Fiscal Tax Invoice that you want to credit                   |
| `products`       | `Product[]` | `Yes`    | 1000       |                                                                             | List of products on the Credit Note                                                          |
| `currency_code`  | string      | `Yes`    |            |                                                                             | This is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) Currency Code e.g ZWG or USD. |
| `money_type`     | string      | `Yes`    |            | `Cash`, `Card`, `MobileWallet`, `Coupon`, `Credit`, `BankTransfer`, `Other` | Payment method that you have settled the credit note with your customer                      |

## `CreateDebitNoteBody`

| Name             | Type        | Required | Max Length | Options                                                                     | Description                                                                                  |
| ---------------- | ----------- | -------- | ---------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `invoice_number` | string      | `Yes`    | 50         |                                                                             | The invoice number of the ZIMRA Fiscal Tax Invoice that you want to debit                    |
| `products`       | `Product[]` | `Yes`    | 1000       |                                                                             | List of products on the Debit Note                                                           |
| `currency_code`  | string      | `Yes`    |            |                                                                             | This is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) Currency Code e.g ZWG or USD. |
| `money_type`     | string      | `Yes`    |            | `Cash`, `Card`, `MobileWallet`, `Coupon`, `Credit`, `BankTransfer`, `Other` | Payment method that you have settled the credit note with your customer                      |
