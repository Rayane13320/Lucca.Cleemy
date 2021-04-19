export interface ExpenseResults {
  total: number;
  items: Array<ExpenseItem>;
}

export interface ExpenseItem {
  id: string;
  purchasedOn: Date;
  nature: string;
  originalAmount: ExpenseItemAmount;
  convertedAmount: ExpenseItemAmount;
  comment: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

export interface ExpenseItemAmount {
  amount: number;
  currency: string;
}

export const convertedAmountCurrency: string = "EUR";
export const defaultSelectedCurrency: string = "EUR";

export enum ExpenseEditionMode {
  Create,
  Update,
}
