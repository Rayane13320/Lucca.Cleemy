import { Component, ChangeDetectionStrategy, ViewChild } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable, Subject } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { ExpenseItem } from "src/app/modules/expense/state/expense/expense.model";
import { CurrencyQuery } from "../../state/currency/currency.query";
import { ExpenseQuery } from "../../state/expense/expense.query";
import { ExpenseService } from "../../state/expense/expense.service";
import { ExpenseDialogComponent } from "../expense-dialog/expense-dialog.component";

@Component({
  selector: "app-expense-list",
  templateUrl: "./expense-list.component.html",
  styleUrls: ["./expense-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseListComponent {
  @ViewChild(ExpenseDialogComponent)
  public expenseDialogComponent!: ExpenseDialogComponent;

  public expenses$: Observable<Array<ExpenseItem>>;
  public pageTotalSubject: Subject<number> = new Subject<number>();
  public readonly PAGE_ITEM_LIMIT: number = 5;

  private currentPage: number;
  constructor(
    private readonly messageService: MessageService,
    private readonly expenseService: ExpenseService,
    public readonly currencyQuery: CurrencyQuery,
    public readonly expenseQuery: ExpenseQuery,
  ) {
    this.getExpenses(1);
  }

  public deleteExpense(id: string): void {
    this.expenseService
      .deleteExpense(id)
      .pipe(switchMap(() => this.getExpensesObservable(this.currentPage)))
      .subscribe({
        complete: () =>
          this.messageService.add({
            severity: "success",
            summary: "Expense deleted",
          }),
      });
  }

  public getExpenses(page: number): void {
    this.getExpensesObservable(page).subscribe();
  }

  public refreshPage(): void {
    this.getExpenses(this.currentPage);
  }

  public edit(id: string): void {
    this.expenseDialogComponent.edit(id);
  }

  public duplicate(id: string): void {
    this.expenseDialogComponent.duplicate(id);
  }

  public create(): void {
    this.expenseDialogComponent.create();
  }

  private getExpensesObservable(page: number): Observable<void> {
    return this.expenseService.getExpenses(page, this.PAGE_ITEM_LIMIT).pipe(
      tap(() => {
        this.currentPage = page;
      }),
    );
  }
}
