import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { ExpenseApiService } from "src/app/core/http/expense-api.service";
import { ExpenseItem } from "src/app/modules/expense/state/expense/expense.model";
import { ExpenseStore } from "./expense.store";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  constructor(
    private readonly expenseApiService: ExpenseApiService,
    private readonly store: ExpenseStore,
  ) {}

  public getExpenses(pageNumber: number, pageLimit: number): Observable<void> {
    return this.expenseApiService.getExpenses(pageNumber, pageLimit).pipe(
      tap((x) => this.store.update(x)),
      switchMap((x) => of(void 0)),
    );
  }

  public createExpense(expense: Partial<ExpenseItem>): Observable<void> {
    return this.expenseApiService.createExpense(expense);
  }

  public updateExpense(
    id: string,
    expense: Partial<ExpenseItem>,
  ): Observable<void> {
    return this.expenseApiService.updateExpense(id, expense);
  }

  public deleteExpense(id: string): Observable<void> {
    return this.expenseApiService.deleteExpense(id);
  }
}
