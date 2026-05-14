![Build Status](https://github.com/Panier-App/ZIMRA/actions/workflows/ci.yml/badge.svg)

## ZIMRA Fiscalisation

A type-safe and frictionless library for ZIMRA Fiscalisation allowing you create `ZIMRA Fiscal Invoices`, `Credit Notes` and `Debit Notes` without having to worry about Hashing, Signing Receipts, Opening or Closing fiscal days. If you need more functionality please visit the [Panier Developer API](https://panier.app/api-documentation).

> This library will require you to setup a paid [Panier](https://panier.app) account in order to go into production but we have **Test Credentials** that you can use to try out the system and see if it's the best fit for your application. These will be hitting the **ZIMRA FDMS Test Environment**. Don't forget to switch your `host` to `https://panier.app/api/v1` when you are in production so that you can hit the **ZIMRA FDMS Production Environment**.

## Installation

```
npm install @panierapp/zimra
```

## Usage

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

## Create a ZIMRA Fiscal Tax Invoices
Now let's use our Panier Client instance to create a ZIMRA Fiscal Tax Invoice

```typescript
// First Create Panier Client instance

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
      zimra_tax_id: 517,
    },
  ],
  currency_code: 'USD',
  money_type: 'Cash',
} satisfies Panier.CreateFiscalInvoiceBody;

const fiscal_invoice = await panier.createFiscalInvoice(fiscalInvoiceBody)
                                .catch(error => console.error(error))

if(fiscal_invoice?.created) {
  console.log('You have successfully created a fiscal invoice');
  console.log(fiscal_invoice);

  // Check for ZIMRA validation errors
  if(fiscal_invoice.created.validation_errors.length === 0) {
    console.log('No validation Errors ');
  } else {
    console.log(
      `You have ${fiscal_invoice.created.validation_errors.length} validation errors`,
    );
    console.log(fiscal_invoice.created.validation_errors);
  }
} else {
  console.log('Failed to create a fiscal invoice');
  console.log(fiscal_invoice);
}
```

Et voila, that's it 🎉. You should then get a response like this
```json
{
  "created": {
    "id": "cmp5e4a9g000czmjm1ixibpk9",
    "device_id": 33389,
    "device_serial_number": "V9OWMFMUOS2OBJD5",
    "receipt_type": "FISCALINVOICE",
    "receipt_currency": "USD",
    "receipt_counter": 4,
    "receipt_global_no": 68,
    "receipt_date": "2026-05-14T13:13:33",
    "receipt_total": 5.81,
    "receipt_taxes": [
      {
        "taxID": 2,
        "taxAmount": 0,
        "salesAmountWithTax": 5.81,
        "taxPercent": 0
      }
    ],
    "previous_receipt_hash": "7d4+Q17Vb3Hx6vr7Dmt8D34T+PbwtY+zDBttwWSSYvs=",
    "result_used_to_hash": "33389FISCALINVOICEUSD682026-05-14T13:13:335810.0005817d4+Q17Vb3Hx6vr7Dmt8D34T+PbwtY+zDBttwWSSYvs=",
    "receipt_hash": "tHD7PbrF/YOQlV/vIVtr/byOrjCKHiMj5TByHPP0oTA=",
    "signature": "jGpuAD+aKyxNmNxwj/QvaH/6Twh2OFkr+KsFSqoXVDSZ/OCTLN2gDTRU85fcQdtPINWsXMfsboJE+8/CkWSmwLCa9sASc6Exin/75N+2BWJXuJGSr+UxqmnHjeXWrOVHkTiW6YB/J2UCkkxmEUBq3JYc/QXn3SGnw3jFt+tSN1GeJouy1u8qsOZb6cZsAlsjR2SDGfKNxb6MB97C3S52+8UHSAL7TK3VwORr/NyiDiKeq+IvkN7OQINTRvs94lLDMSXgvhAFy9ITcbUzcqGPTKG01GQwHxjZw2+/DIdhTuG8g86f17m5yAdhBHwddrTYFha9wN8c+gHpEqnmhAhYsw==",
    "qr_code_url": "https://fdmstest.zimra.co.zw/0000033389140520260000000068CC86EF9CDFA968E3",
    "verification_code": "CC86-EF9C-DFA9-68E3",
    "receipt_data": {
      "receipt": {
        "receiptType": "FiscalInvoice",
        "receiptCurrency": "USD",
        "receiptCounter": 4,
        "receiptGlobalNo": 68,
        "receiptDate": "2026-05-14T13:13:33",
        "receiptLinesTaxInclusive": false,
        "receiptLines": [
          {
            "receiptLineType": "Sale",
            "receiptLineNo": 1,
            "receiptLineHSCode": "08080101",
            "receiptLineName": "Apples",
            "receiptLinePrice": 5.81,
            "receiptLineQuantity": 1,
            "receiptLineTotal": 5.81,
            "taxID": 2,
            "taxPercent": 0
          }
        ],
        "receiptTaxes": [
          {
            "taxID": 2,
            "taxAmount": 0,
            "salesAmountWithTax": 5.81,
            "taxPercent": 0
          }
        ],
        "receiptPayments": [
          {
            "moneyTypeCode": "Cash",
            "paymentAmount": 5.81
          }
        ],
        "receiptTotal": 5.81,
        "receiptPrintForm": "InvoiceA4",
        "receiptDeviceSignature": {
          "hash": "tHD7PbrF/YOQlV/vIVtr/byOrjCKHiMj5TByHPP0oTA=",
          "signature": "jGpuAD+aKyxNmNxwj/QvaH/6Twh2OFkr+KsFSqoXVDSZ/OCTLN2gDTRU85fcQdtPINWsXMfsboJE+8/CkWSmwLCa9sASc6Exin/75N+2BWJXuJGSr+UxqmnHjeXWrOVHkTiW6YB/J2UCkkxmEUBq3JYc/QXn3SGnw3jFt+tSN1GeJouy1u8qsOZb6cZsAlsjR2SDGfKNxb6MB97C3S52+8UHSAL7TK3VwORr/NyiDiKeq+IvkN7OQINTRvs94lLDMSXgvhAFy9ITcbUzcqGPTKG01GQwHxjZw2+/DIdhTuG8g86f17m5yAdhBHwddrTYFha9wN8c+gHpEqnmhAhYsw=="
        },
        "invoiceNo": "INV000001"
      }
    },
    "validation_errors": [],
    "fiscal_day_no": 15
  }
}
```

## Create a Fiscal Tax Invoice with customer details
You can also add customer details to your fiscal tax invoice but you have to add their `Tin Number`, `Phone` and `Email` for their information to appear on the `Buyer section` of the ZIMRA Fiscal Tax Invoice. 

> If you want the buyer's address to appear on the `Buyer section` of the ZIMRA Fiscal Tax Invoice, you need to add the customer's `province`, `city`, `street` and `house_no`

```typescript
// First Create Panier Client instance

// Create the doc
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
  money_type: 'Cash'
} satisfies Panier.CreateFiscalInvoiceBody;

const fiscal_invoice_with_customer = await panier.createFiscalInvoice(fiscalInvoiceWithCustomerBody)
                                                .catch(error => console.error(error))

if(fiscal_invoice_with_customer?.created) {
  console.log('You have successfully created a fiscal invoice');
  console.log(fiscal_invoice_with_customer);

  // Check for ZIMRA validation errors
  if(fiscal_invoice_with_customer.created.validation_errors.length === 0) {
    console.log('No validation Errors ');
  } else {
    console.log(
      `You have ${ fiscal_invoice_with_customer.created.validation_errors.length } validation errors`,
    );
    console.log(fiscal_invoice_with_customer.created.validation_errors);
  }
} else {
  console.log('Failed to create a fiscal invoice');
  console.log(fiscal_invoice_with_customer);
}
```

## Create a Credit Note
Now let us create a `Credit Note`.

```typescript
// First Create Panier Client instance

// Create the doc
const creditNoteBody = {
  invoice_number: 'INV000001', // The Invoice Number of the ZIMRA Fiscal Tax Invoice that you want to credit
  products: [
    {
      name: 'Jumbo Ban',
      selling_price: 0.9, // Selling Price Excluding Tax
      quantity: 1,
      discount: 0, // Optional
      hs_code: '1905.90.00',
      zimra_tax_id: 517, // See ZIMRA Tax ID Table for more optionals
    },
  ],
  currency_code: 'USD',
  money_type: 'Cash',
  receiptNotes: 'The customer was over charged by $2.70'
} satisfies Panier.CreateCreditNoteBody;

const credit_note = await panier.createCreditNote(creditNoteBody)
                                .catch((error) => console.error(error));

if(credit_note?.created) {
  console.log('You have successfully created a credit note');
  console.log(credit_note);

  // Check for ZIMRA validation errors
  if(credit_note.created.validation_errors.length === 0) {
    console.log('No validation Errors ');
  } else {
    console.log(`You have ${ credit_note.created.validation_errors.length } validation errors`);
    console.log(credit_note.created.validation_errors);
  }
} else {
  console.log('Failed to create a credit note');
  console.log(credit_note);
}
```

## Create a Debit Note
Now let's create a Debit Note

```typescript
// First Create Panier Client instance

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
            zimra_tax_id: 517 // See ZIMRA Tax ID Table for more optionals
        }
    ],
    currency_code: "USD",
    money_type: "Cash",
    receiptNotes: 'The customer was under charged by $1.80'
} satisfies Panier.CreateDebitNoteBody

const debit_note = await panier.createDebitNote(debitNoteBody)
                              .catch(error => console.error(error));

if(debit_note?.created) {
    console.log('You have successfully created a debit note')
    console.log(debit_note)

    // Check for ZIMRA validation errors
    if(debit_note.created.validation_errors.length === 0) {
        console.log('No validation Errors ')
    }
    else {
        console.log(`You have ${ debit_note.created.validation_errors.length } validation errors`)
        console.log(debit_note.created.validation_errors)
    }
}
else {
    console.log('Failed to create a debit note')
    console.log(debit_note)
}

```

## ZIMRA Tax IDs
Below are tables showing all the valid ZIMRA Tax IDs for the ZIMRA Test and Production Environments

> Take special care to check the tax IDs and please note that they are not always the same accross Environments

### Test Environment
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

### Production Environment
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


## Proxy Support
If you want to use a proxy all you have to do is add a `proxy_url` when you are creating the `Panier Client` instance.

### Node.js
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

// Now you can use the proxied instance in your app
```

### Example: Allow self-signed certificates (USE AT YOUR OWN RISK!)
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

// Now you can use the proxied instance in your app
```

## Caveats
### 1. Cold Starts
If you try to create a `ZIMRA Fiscal Tax Invoice`, `Credit Note` or `Debit Note` when your fiscal day is closed, [Panier](https://panier.app) will first open your fiscal day then perform the operation. This will add a delay to the overlay operation. However once the fiscal day has been opened the execution time will reduce and return to normal.

### 2. Invoice Number Collisions
The ZIMRA FDMS requires that all invoice_numbers be unique for a single tax payer. Meaning that if you were using another fiscal device before, you can not use the same invoice numbers that you used on that device with this library. You you do, ZIMRA will return a `RCPT020` error code which means `Invoice signature is not valid`. This will prevent your fiscal day from beign able to close and you would have to send an email to `csimango@zimra.co.zw` and `gsangare@zimra.co.zw` requesting that your fiscal day be manually closed on the ZIMRA side. You must include your `Company Name`, `Device ID` and current `Fiscal Day` in your email.

### 3. ZIMRA Valitation Errors
In the event that you get a `validation_error` send an email to `csimango@zimra.co.zw` and `gsangare@zimra.co.zw` requesting that your fiscal day be manually closed on the ZIMRA side. You must include your `Company Name`, `Device ID` and current `Fiscal Day` in your email. You can use the following table to see the meaning of each validation error code (_See the [ZIMRA Fiscal Device Gateway API Specification](https://www.zimra.co.zw/downloads/category/9-domestic-taxes?download=3807:fiscalisation-api-documentation) for more information_).
|Validation Error Code|Color|Text|
|-|-|-|
|RCPT010|Red|Wrong currency code is used|
|RCPT011|Red|Receipt counter is not sequential.|
|RCPT012|Red|Receipt global number is not sequential.|
|RCPT013|Red|Invoice number is not unique|
|RCPT014|Yellow|Receipt date is earlier than fiscal day opening date|
|RCPT015|Red|Credited/debited invoice data is not provided|
|RCPT016|Red|No receipt lines provided|
|RCPT017|Red|Taxes information is not provided|
|RCPT018|Red|Payment information is not provided|
|RCPT019|Red|Invoice total amount is not equal to sum of all invoice lines|
|RCPT020|Red|Invoice signature is not valid|
|RCPT021|Red|VAT tax is used in invoice while taxpayer is not VAT taxpayer|
|RCPT022|Red|Invoice sales line price must be greater than 0 (less than 0 for Credit note), discount line price must be less than 0 for invoice|
|RCPT023|Red|Invoice line quantity, must be positive|
|RCPT024|Red|Invoice line total is not equal to unit price * quantity|
|RCPT025|Red|Invalid tax is used|
|RCPT026|Red|Incorrectly calculated tax amount|
|RCPT027|Red|Incorrectly calculated total sales amount (including tax) / rate|
|RCPT028|Red|Payment amount must be greater than or equal 0 (less than or equal to 0 for Credit note)|
|RCPT029|Red|Credited/debited invoice information provided for regular invoice|
|RCPT030|Red|Invoice date is earlier than previously submitted receipt date|
|RCPT031|Yellow|Invoice is submitted with the future date|
|RCPT032|Red|Credit / debit note refers to non-existing invoice|
|RCPT033|Red|Credited/debited invoice is issued more than 12 months ago|
|RCPT034|Red|Note for credit/debit note is not provided|
|RCPT035|Red|Total credit note amount exceeds original invoice amount|
|RCPT036|Red|Credit/debit note uses other taxes than are used in the original invoice|
|RCPT037|Red|Invoice total amount is not equal to sum of all invoice lines and taxes applied|
|RCPT038|Red|Invoice total amount is not equal to sum of sales amount including tax in tax table|
|RCPT039|Red|Invoice total amount is not equal to sum of all payment amounts|
|RCPT040|Red|Invoice total amount must be greater than or equal to 0 (less than or equal to 0 for Credit note)|
|RCPT041|Yellow|Invoice is issued after fiscal day end|
|RCPT042|Red|Credit/debit note uses other currency than is used in the original invoice|
|RCPT043|Red|Mandatory buyer data fields are not provided|
|RCPT047|Red|HS code must be sent if taxpayer is a VAT payer|
|RCPT048|Red|HS code length must be 4 or 8 digits if taxpayer is not VAT payer, 4 or 8 digits if taxpayer is VAT payer and applied tax percent is bigger than 0, 8 digits if taxpayer is VAT payer and applied tax percent is equal to 0 or is empty|

## Methods

### `createFiscalInvoice()`
This method is used to create a `ZIMRA Fiscal Tax Invoice`

```typescript
// First Create Panier Client instance

const fiscalInvoiceBody = {
  // add Fiscal Invoice Body
} satisfies Panier.CreateFiscalInvoiceBody;

const fiscal_invoice = await panier.createFiscalInvoice(fiscalInvoiceBody)
                                    .catch((error) => error);

// Now you can use the Fiscal Invoice in our app
console.log(fiscal_invoice);
```

### `createCreditNote()`
This method is used to create a `Credit Note`

```typescript
// First Create Panier Client instance

const creditNoteBody = {
  // add Credit Note Body
} satisfies Panier.CreateCreditNoteBody;

const credit_note = await panier.createCreditNote(creditNoteBody)
                                .catch((error) => error);

// Now you can use the Credit Note in our app
console.log(credit_note);
```

### `createDebitNote()`
This method is used to create a `Debit Note`

```typescript
// First Create Panier Client instance

const debitNoteBody = {
  // ... add Debit Note Body
} satisfies Panier.CreateDebitNoteBody;

const debit_note = await panier.createDebitNote(debitNoteBody)
                                .catch((error) => error);

// Now you can use the Debit Note in our app
console.log(debit_note);
```

### `find()`
This method is used to find a `ZIMRA Fiscal Invoice` and it's associated `Credit Notes` and `Debit Notes`

```typescript
// First Create Panier Client instance
const fidnBody = {
  invoice_number: 'INV000001'
} satisfies Panier.FindFiscalInvoiceBody

const getFiscalInvoice = await panier.find(fidnBody)
                                    .catch((error) => error);

// Now you can use the Fiscal Invoice in our app
console.log(getFiscalInvoice);
```

### `getDeviceInformation()`
This method will return return information about your fiscal device, that is, `Device ID`, `Device Serial Number`, `Fiscal Day`, `Device Status`, `Billing Status`, `Company Name`.

```typescript
// First Create Panier Client instance

const get_device_information = await panier.getDeviceInformation()
                                            .catch((error) => error);

// Now you can use the device information in our app
console.log(get_device_information);
```
Here is what the response will look like
```json
{ 
  "company": { 
    "name": "EXAMPLE COMPANY",
    "phone": "0772000002",
    "email": "support@panier.app",
    "address": "123, Street Road, Harare, Harare",
    "fax": null,
    "website": null,
    "subscription": { 
      "credit_score": 1409 
    } 
  },
  "device_status": { 
    "fiscalDayStatus": "FiscalDayOpened",
    "lastReceiptGlobalNo": 75,
    "lastFiscalDayNo": 15,
    "operationID": "0HNLGU4748JK0:00000001" 
  },
  "device_id": 33389,
  "fiscal_day_no": 15,
  "device_serial_number": "V9OWMFMUOS2OBJD5" 
}
```

### `openDay()`
When your fiscal day is closed, [Panier](https://panier.app) automatically opens your fiscal day if you before performing any operation. However this method manually open your fiscal day.

```typescript
// First Create Panier Client instance

const open_day = await panier.openDay()
                        .catch((error) => error.data);

// fiscalDayStatus options "FiscalDayOpened", "FiscalDayClosed", "FiscalDayCloseFailed", "FiscalDayCloseInitiated"
if(open_day?.fiscalDayStatus === 'FiscalDayOpened') {
  // Do some operation now that your fiscal day is opened
}
```

### `closeDay()`
[Panier](https://panier.app) automatically closes your fiscal day 23 hours and 30 minutes after your fiscal day was opened. However this method allows you to manually close your fiscal day.

```typescript
// ... First Create Panier Client instance

const close_day = await panier.closeDay()
                            .catch((error) => error);

// fiscalDayStatus opitons "FiscalDayOpened", "FiscalDayClosed", "FiscalDayCloseFailed", "FiscalDayCloseInitiated"
if(close_day?.fiscalDayStatus === 'FiscalDayClosed') {
  // Do some operation now that your fiscal day is closed
}
```

## Schemas

### `Credentials`
| Name  | Type | Required | Options | Description |
| :----- | ----- | ----- | ----- | ------ |
| `host` | string  | `Yes` | `https://panier.app/api/v1`, `https://dev.panier.app/api/v1` | Determines whether you are in the ZIMRA Test Environment or Production Environment |
| `proxy_url` | string | `No` |  | Proxy URL for added Proxy support |
| `unsecured_proxy_agent` | boolean | `No` |  | Allows you to self-signed certificates when using the `proxy_url`. This makes fetch unsecure against MITM attacks (USE AT YOUR OWN RISK!). |
| `APP_ID` | string |   | `Yes` |   |
| `API_KEY` | string |  | `Yes` |   |


### `Product`
| Name  | Type | Required | Max Length |  Description |
| :----- | ----- | ----- | -----  | ------ |
| `name` | string | `Yes`| 190 | Product name |
| `selling_price` | number | `Yes` |  | Product selling price excluding tax |
| `quantity` | number | `Yes` |  | Number of units being sold |
| `discount` | number | `No` |  | Discount amount being applied for the line item |
| `hs_code` | string | `Yes` | 10 | The unique Harmonized System Code of the product. [What is a HS Code?](https://www.zimra.co.zw/news/2308-use-of-harmonized-system-codes-hs-codes-under-domestic-taxes-in-recording-of-sales-transactions-using-fiscal-devices). |
| `zimra_tax_id`  | number | `Yes` |  | ZIMRA Tax ID. See the **ZIMRA Tax ID section** for more information                                                                                                                                                             |


### `Customer`
| Name         | Type   | Required | Max Length | Description               |
| :----------- | ------ | -------- | ---------- | ------------------------- |
| `name`       | string | `Yes`    | 190        | Name             |
| `email`      | string | `Yes`    | 190        | Email address    |
| `phone`      | string | `Yes`    | 20         |  Phone number     |
| `province`    | string | `No`     | 190        | Province name  |
| `city`    | string | `No`     | 190        | City, town, growth point, farming area, mining area  |
| `street`    | string | `No`     | 190        | Street, stand number, village |
| `house_no`    | string | `No`     | 190        | House or office number |
| `tin_number` | string | `Yes`    | 20         | ZIMRA Tin Number |
| `vat_number` | string | `No`     | 20         | ZIMRA VAT Number |


### `CreateZimraFiscalInvoiceBody`
| Name  | Type | Required | Max Length | Options | Description |
| :----- | ----- | ----- | ----- | ------- | ------ |
| `invoice_number` | string | `No` | 50  |  | The unique identifier of the ZIMRA Fiscal Tax Invoice. If not provided a NanoID is used e.g XDVP07DIYQDO. |
| `customer` | `Customer`  | `No` |   |   | Customer details |
| `products` | `Product[]` | `Yes`    | 1000 |  | List of products on the ZIMRA Fiscal Tax Invoice |
| `currency_code` | string  | `Yes` |  |  | This is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) Currency Code e.g ZWG or USD |
| `money_type` | string | `Yes` |  | `Cash`, `Card`, `MobileWallet`, `Coupon`, `Credit`, `BankTransfer`, `Other` | Payment method that your customer paid for the ZIMRA Fiscal Tax Invoice |


### `CreateCreditNoteBody`
| Name  | Type | Required | Max Length | Options | Description |
| :----- | ----- | ----- | ----- | ------- | ------ |
| `invoice_number` | string      | `Yes`    | 50 |  | The invoice number of the ZIMRA Fiscal Tax Invoice that you want to credit |
| `products`  | `Product[]` | `Yes` | 1000 |   | List of products on the Credit Note                                                          |
| `currency_code` | string | `Yes` |    |   | This is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) Currency Code e.g ZWG or USD. |
| `money_type` | string | `Yes` |   | `Cash`, `Card`, `MobileWallet`, `Coupon`, `Credit`, `BankTransfer`, `Other` | Payment method that you have settled the credit note with your customer |
| `receiptNotes` | string | `No` |  |  | Note for credit or debit notes |


### `CreateDebitNoteBody`
| Name  | Type | Required | Max Length | Options | Description |
| :----- | ----- | ----- | ----- | ------- | ------ |
| `invoice_number` | string      | `Yes`    | 50 |   | The invoice number of the ZIMRA Fiscal Tax Invoice that you want to debit |
| `products` | `Product[]` | `Yes` | 1000 |  | List of products on the Debit Note |
| `currency_code` | string | `Yes` |   |   | This is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) Currency Code e.g ZWG or USD. |
| `money_type` | string | `Yes` |   | `Cash`, `Card`, `MobileWallet`, `Coupon`, `Credit`, `BankTransfer`, `Other` | Payment method that you have settled the credit note with your customer  |
| `receiptNotes` | string | `No` |  |  | Note for credit or debit notes |
