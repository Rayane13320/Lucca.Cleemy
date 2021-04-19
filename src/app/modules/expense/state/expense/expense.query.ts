import { Injectable } from "@angular/core";
import { Query } from "@datorama/akita";
import { Observable } from "rxjs";
import { ExpenseItem, ExpenseResults } from "./expense.model";
import { ExpenseStore } from "./expense.store";

@Injectable({ providedIn: "root" })
export class ExpenseQuery extends Query<ExpenseResults> {
  public expenseTotal$: Observable<number> = this.select((x) => x.total);
  public expenseItems$: Observable<Array<ExpenseItem>> = this.select(
    (x) => x.items,
  );

  constructor(protected store: ExpenseStore) {
    super(store);
  }

  public getExpenseTotal(): number {
    return this.getValue().total;
  }

  public getExpense(id: string): ExpenseItem {
    return this.getValue().items.find((x) => x.id === id);
  }
}
