export interface Transaction {
    id: string;
    date: string;
    merchant: string;
    note: string;
    amount: number;
    category: string;
}

export type TransactionPatchKeys = "date" | "note" | "category";

export type TransactionPatch = {
    [key in TransactionPatchKeys]: string;
};
export interface TransactionCategory {
    id: string;
    name: string;
}
