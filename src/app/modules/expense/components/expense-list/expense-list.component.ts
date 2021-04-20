import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  ElementRef,
} from "@angular/core";
import { MessageService } from "primeng/api";
import { Table } from "primeng/table";
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

  @ViewChild(Table)
  public expenseTable!: Table;

  @ViewChild("searchField")
  public searchField: ElementRef;

  public expenses$: Observable<Array<ExpenseItem>>;
  public pageTotalSubject: Subject<number> = new Subject<number>();
  public readonly PAGE_ITEM_LIMIT: number = 5;
  public readonly searchPlaceHolder: string = $localize`:@@searchExpensePlaceHolder:Search expense`;
  public readonly editButtonLabel: string = $localize`:@@editButtonLabel:Edit`;
  public readonly duplicateButtonLabel: string = $localize`:@@duplicateButtonLabel:Duplicate`;
  public readonly deleteButtonLabel: string = $localize`:@@deleteButtonLabel:Delete`;

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
            summary: $localize`:@@expenseDelete:Expense deleted`,
          }),
      });
  }

  public getExpenses(page: number): void {
    if (page !== this.currentPage && this.expenseTable) {
      this.expenseTable.filterGlobal(null, "contains");
      this.searchField.nativeElement.value = null;
    }
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

  public getDeletionMessage(id: string): string {
    return $localize`:@@expenseDeletionConfirm:Do you really want to delete the expense number ${id} ?`;
  }

  private getExpensesObservable(page: number): Observable<void> {
    return this.expenseService.getExpenses(page, this.PAGE_ITEM_LIMIT).pipe(
      tap(() => {
        this.currentPage = page;
      }),
    );
  }
}
