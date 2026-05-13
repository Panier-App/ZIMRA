export namespace Panier {
  export type Credentials = {
    /**
     * Determines whether you are in the ZIMRA `Test Environment` or `Production Environment`. Use https://panier.app/api/v1 in the `Production Environment`.
     */
    host: string;
    /** Proxy URL for added Proxy support  */
    proxy_url?: string;
    /** Allows you to self-signed certificates when using the `proxy_url`. This makes fetch unsecure against MITM attacks (USE AT YOUR OWN RISK!). */
    unsecured_proxy_agent?: boolean;
    APP_ID: string;
    API_KEY: string;
  };

  /**
   * Products
   */
  type Product = {
    /** Product name */
    name: string;
    /** Product selling price excluding tax */
    selling_price: number;
    /** Number of units being sold */
    quantity: number;
    /** Discount amount being applied for the line item */
    discount?: number;
    /** The unique Harmonized System Code of the product. [What is a HS Code?](https://www.zimra.co.zw/news/2308-use-of-harmonized-system-codes-hs-codes-under-domestic-taxes-in-recording-of-sales-transactions-using-fiscal-devices). */
    hs_code: string;
    /**
     * ## ZIMRA Tax IDs
     * Below are tables showing all the valid ZIMRA Tax IDs for the ZIMRA Test and Production Environments
     *
     * ### Test Environment
     * | Name | ZIMRA Tax ID |
     * | :-- | --: |
     * | Exempt |  1 |
     * | Zero rated 0% | 2 |
     * | Non-VAT Withholding Tax | 514 |
     * | Standard rated 15.5% | 517 |
     *
     *
     * ### Production Environment
     * | Name | ZIMRA Tax ID |
     * | :-- | --: |
     * | Zero rated 0% | 2 |
     * | Exempt | 3 |
     * | Non-VAT Withholding Tax | 514 |
     * | Standard rated 15.5% | 515 |
     */
    zimra_tax_id: number;
  };

  type Customer = {
    /** Customer name */
    name: string;
    /** Customer phone number */
    phone: string;
    /** Customer email address */
    email: string;
    /** Customer physical address */
    address?: string;
    /** Customer ZIMRA Tin Number */
    tin_number: string;
    /** Customer ZIMRA VAT Number */
    vat_number?: string;
  };

  /** This is the schema of the object required to create a ZIMRA Fiscal Tax Invoice */
  export type CreateFiscalInvoiceBody = {
    /** The unique identifier of the ZIMRA Fiscal Tax Invoice. If not provided a NanoID is used e.g XDVP07DIYQDO. */
    invoice_number?: string;
    /** Customer details */
    customer?: Customer;
    /** Product list in your `ZIMRA Fiscal Tax Invoice`. */
    products: Product[];
    /** This is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) Currency Code e.g ZWG or USD. */
    currency_code: string;
    /** Payment method that your customer paid for the `ZIMRA Fiscal Tax Invoice`, `Credit Note` or `Debit Note`. */
    money_type:
      | 'Cash'
      | 'Card'
      | 'MobileWallet'
      | 'Coupon'
      | 'Credit'
      | 'BankTransfer'
      | 'Other';
  };

  /** This is the schema of the object required to create a Credit Note */
  export type CreateCreditNoteBody = {
    /** The invoice number of the ZIMRA Fiscal Tax Invoice that you want to credit */
    invoice_number: string;
    /** Product list in your `Credit Note`. */
    products: Product[];
    /** This is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) Currency Code e.g ZWG or USD. */
    currency_code: string;
    /** Payment method that your customer paid for the `ZIMRA Fiscal Tax Invoice`, `Credit Note` or `Debit Note`. */
    money_type:
      | 'Cash'
      | 'Card'
      | 'MobileWallet'
      | 'Coupon'
      | 'Credit'
      | 'BankTransfer'
      | 'Other';
  };

  /** This is the schema of the object required to create a Debit Note */
  export type CreateDebitNoteBody = {
    /** The invoice number of the ZIMRA Fiscal Tax Invoice that you want to debit */
    invoice_number: string;
    /** Product list in your `Debit Note`. */
    products: Product[];
    /** This is the [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) Currency Code e.g ZWG or USD. */
    currency_code: string;
    /** Payment method that your customer paid for the `ZIMRA Fiscal Tax Invoice`, `Credit Note` or `Debit Note`. */
    money_type:
      | 'Cash'
      | 'Card'
      | 'MobileWallet'
      | 'Coupon'
      | 'Credit'
      | 'BankTransfer'
      | 'Other';
  };
}
