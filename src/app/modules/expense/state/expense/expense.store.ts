import { Injectable } from "@angular/core";
import { Store, StoreConfig } from "@datorama/akita";
import { ExpenseResults } from "./expense.model";

export function createInitialState(): ExpenseResults {
  return {
    total: 0,
    items: [],
  };
}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "Expense" })
export class ExpenseStore extends Store<ExpenseResults> {
  constructor() {
    super(createInitialState());
  }
}
