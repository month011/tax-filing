export interface SubmitTaxFiling {
    filingType: string;
    month: string;
    year: string;
    saleAmount: number;
    taxAmount: number;
    surcharge: number;
    penalty: number;
    totalAmount: number;
}

export enum StepBar {
    INPUT = 1,
    REVIEW,
}

export class DropDownData {
    itemLabel: string | undefined
    itemValue: string | undefined
}