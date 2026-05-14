export namespace Panier {
    export type Credentials = {
        /**
        * Determines whether you are in the ZIMRA `Test Environment` or `Production Environment`. Use https://panier.app/api/v1 in the `Production Environment`.
        */
        host: string;
        /** Proxy URL for added Proxy support  */
        proxy_url?: string;
        /** 
        * Allows you to self-signed certificates when using the `proxy_url`. This makes fetch unsecure against MITM attacks (USE AT YOUR OWN RISK!). 
        */
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
        zimra_tax_id: 1 | 2 | 3 | 514 | 515 | 517;
    };

    type Customer = {
        /** Name */
        name: string;
        /** Phone number */
        phone: string;
        /** Email address */
        email: string;
        /** Province */
        province?: string;
        /** City, town, growth point, farming area, mining area */
        city?: string;
        /** Street, stand number, village */
        street?: string;
        /** House or office number */
        house_no?: string;
        /** ZIMRA Tin Number */
        tin_number: string;
        /** ZIMRA VAT Number */
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
        /** Note for credit note/debit note/invoice. */
        receiptNotes?: string;
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
        /** Note for credit note/debit note/invoice. */
        receiptNotes?: string;
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
        /** Note for credit note/debit note/invoice. */
        receiptNotes?: string;
    };

    /** This is the schema of the object required to find a ZIMRA Fiscal Invoice */
    export type FindFiscalInvoiceBody = {
        /** The invoice number of the ZIMRA Fiscal Tax Invoice that you want to find */
        invoice_number: string;
    }

    // Response Data
    type ZimraReceiptLine = {
        receiptLineType: "Sale" | "Discount",
        receiptLineNo: number,
        receiptLineHSCode?: string, 
        receiptLineName: string,
        receiptLinePrice?: number,
        receiptLineQuantity: number,
        receiptLineTotal: number,
        taxCode?: string,
        taxPercent?: number, // Applied tax percent. In case of no VAT sale, 0 value should be used, in case of exempt this field should not be provided.
        taxID: number
    }

    type ZimraMoneyTypeCode = "Cash" | "Card" | "MobileWallet" | "Coupon" | "Credit" | "BankTransfer" | "Other";

    type ZimraReceiptPayment = {
        moneyTypeCode: ZimraMoneyTypeCode,
        paymentAmount: number //  value be less than or equal to 0 for CreditNote.
    }

    type ZimraReceiptTax = {
        taxCode?: string,
        taxPercent?: number,
        taxID: number,
        taxAmount: number, // In case of Non VAT and exempt, 0 should be sent in this field.
        salesAmountWithTax: number
    }

    type ZimraReceiptCreditDebitNote = {
        receiptID?: number,
        deviceID?: number,
        receiptGlobalNo?: number,
        fiscalDayNo?: number
    }

    type ZimraReceiptBuyerData = {
        buyerRegisterName: string,
        buyerTradeName?: string,
        vatNumber?: string,
        buyerTIN: string,
        buyerContacts?: {
            phoneNo?: string,
            email?: string
        },
        buyerAddress?: {
            province: string,
            city: string,
            street: string,
            houseNo: string,
            district: string
        }
    }

    type ZimraReceiptType = "FiscalInvoice" | "CreditNote" | "DebitNote";

    type ZimraReceiptData = {
        receipt: {
            receiptType: ZimraReceiptType,
            receiptCurrency: string,
            receiptCounter: number,
            receiptGlobalNo: number,
            invoiceNo?: string,
            buyerData?: ZimraReceiptBuyerData,
            receiptNotes?: string,
            receiptDate: string, // Local time without timezone information
            creditDebitNote?: ZimraReceiptCreditDebitNote,
            receiptLinesTaxInclusive: boolean,
            receiptLines: ZimraReceiptLine[],
            receiptTaxes: ZimraReceiptTax[],
            receiptPayments: ZimraReceiptPayment[],
            receiptTotal: number,
            receiptPrintForm: "InvoiceA4" | "Receipt48", // InvoiceA4, Receipt48
            receiptDeviceSignature: {
                hash: string,
                signature: string 
            }
        }
    };

    type ZimraValidationError = {
        validationErrorCode: string,
        validationErrorColor: 'Grey' | 'Yellow' | 'Red'
    }

    type ZimraSubmitReceiptData = { 
        receiptID: number,
        serverDate: string,
        receiptServerSignature: { 
            certificateThumbprint: string,    
            hash: string,
            signature: string
        },
        validationErrors: ZimraValidationError[],    
        operationID: string 
    }

    type ZimraReceipt = {
        id: string,
        receipt_type: 'FISCALINVOICE' | 'CREDITNOTE' | 'DEBITNOTE',
        device_id: number,
        device_serial_number: string,
        receipt_currency: string,
        receipt_counter: number,
        receipt_global_no: number,
        receipt_date: string,
        receipt_total: number,
        receipt_taxes: ZimraReceiptTax[],
        previous_receipt_hash: string,
        result_used_to_hash: string,
        receipt_hash: string,
        server_response: ZimraSubmitReceiptData,
        signature: string,
        qr_code_url: string,
        verification_code: string,
        receipt_data: ZimraReceiptData,
        validation_errors: ZimraValidationError[],
        fiscal_day_no: number,
    }

    type ZodValidationError =  { 
        code: string,
        values: string[],
        path: string[],
        message: string 
    }

    export type CreateClientResponse = { 
        created?: ZimraReceipt,  
        error?: ZodValidationError | string
    }

    type ZimraFiscalDayStatus = "FiscalDayOpened" | "FiscalDayClosed" | "FiscalDayCloseFailed" | "FiscalDayCloseInitiated";

    export type ZimraDeviceStatus = {
        operationID: String,
        fiscalDayStatus: ZimraFiscalDayStatus,
        fiscalDayReconciliationMode: "Auto" | "Manual",
        fiscalDayServerSignature: {
            certificateThumbprint: string,
            hash: string,
            signature: string
        },
        fiscalDayClosed: string,
        lastFiscalDayNo: number,
        lastReceiptGlobalNo: number,
        fiscalDayClosingErrorCode: "BadCertificateSignature" | "MissingReceipts" | "ReceiptsWithValidationErrors" | "CountersMismatch"
    }

    export type DeviceInformation = {
        company: {
            name: string,
            phone: string,
            email: string,
            address: string,
            fax: string,
            website: string,
            subscription: {
                credit_score: number
            }
        },
        device_status: ZimraDeviceStatus,
        device_id: number,
        fiscal_day_no: number,
        receipt_counter: number,
        receipt_global_no: number,
        device_serial_number: string,
    }
}

