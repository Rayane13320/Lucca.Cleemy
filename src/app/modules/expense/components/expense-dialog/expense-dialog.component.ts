import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MessageService } from "primeng/api";
import { BehaviorSubject, combineLatest, Observable, Subject } from "rxjs";
import { takeUntil, tap } from "rxjs/operators";
import { Currency } from "../../state/currency/currency.model";
import { CurrencyQuery } from "../../state/currency/currency.query";
import {
  convertedAmountCurrency,
  ExpenseItem,
} from "../../state/expense/expense.model";
import { ExpenseQuery } from "../../state/expense/expense.query";
import { ExpenseService } from "../../state/expense/expense.service";

@Component({
  selector: "app-expense-dialog",
  templateUrl: "./expense-dialog.component.html",
  styleUrls: ["./expense-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseDialogComponent implements OnDestroy {
  @Output()
  public expenseUpdate: EventEmitter<void> = new EventEmitter<void>();

  public readonly NATURE_MAX_LENGTH: number = 120;
  public readonly COMMENT_MAX_LENGTH: number = 600;

  public visible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  public get formControls(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  public defaultCurrencyCode: string = convertedAmountCurrency;
  public defaultCurrency$: Observable<Currency>;
  public defaultDate: Date = new Date();
  public header: string;
  public saveButtonLabel: string;
  public form: FormGroup;
  public isCreate: boolean = true;

  private disposeSignal: Subject<void> = new Subject<void>();

  constructor(
    public readonly currencyQuery: CurrencyQuery,
    private readonly formBuilder: FormBuilder,
    private readonly messageService: MessageService,
    private readonly expenseService: ExpenseService,
    private readonly expenseQuery: ExpenseQuery,
  ) {
    this.defaultCurrency$ = currencyQuery.selectCurrency(
      this.defaultCurrencyCode,
    );
    this.form = formBuilder.group({
      id: [],
      purchasedOn: [null, Validators.required],
      nature: [
        null,
        [Validators.required, Validators.maxLength(this.NATURE_MAX_LENGTH)],
      ],
      amount: [null, Validators.required],
      currency: [null, Validators.required],
      convertedAmount: [],
      comment: [
        null,
        [Validators.required, Validators.maxLength(this.COMMENT_MAX_LENGTH)],
      ],
    });

    combineLatest([
      this.formControls.currency.valueChanges,
      this.formControls.amount.valueChanges,
    ])
      .pipe(takeUntil(this.disposeSignal))
      .subscribe(([currency, amount]) => this.setEuroAmount(currency, amount));
  }

  public ngOnDestroy(): void {
    this.disposeSignal.next();
    this.disposeSignal.complete();
  }

  public create(): void {
    this.isCreate = true;
    this.setCreateLabel();
    this.form.patchValue({
      purchasedOn: this.defaultDate,
      currency: this.defaultCurrencyCode,
    });

    this.visible$.next(true);
  }

  public edit(id: string): void {
    this.isCreate = false;
    this.header = $localize`:@@expenseDialogEditHeader:Edit expense ${id}`;
    this.saveButtonLabel = $localize`:@@expenseDialogUpdateButton:Update`;
    const expense: ExpenseItem = this.expenseQuery.getExpense(id);
    this.form.setValue({
      id: expense.id,
      purchasedOn: expense.purchasedOn,
      nature: expense.nature,
      amount: expense.originalAmount.amount,
      currency: expense.originalAmount.currency,
      comment: expense.comment,
      convertedAmount: this.calculateEuroAmount(
        expense.originalAmount.currency,
        expense.originalAmount.amount,
      ),
    });

    this.visible$.next(true);
  }

  public duplicate(id: string): void {
    this.isCreate = true;
    this.setCreateLabel();
    const expense: ExpenseItem = this.expenseQuery.getExpense(id);
    this.form.patchValue({
      purchasedOn: expense.purchasedOn,
      nature: expense.nature,
      amount: expense.originalAmount.amount,
      currency: expense.originalAmount.currency,
      comment: expense.comment,
      convertedAmount: this.calculateEuroAmount(
        expense.originalAmount.currency,
        expense.originalAmount.amount,
      ),
    });

    this.visible$.next(true);
  }

  public close(): void {
    this.visible$.next(false);
    this.form.reset();
  }

  public save(saveAndAdd: boolean): void {
    const expense: Partial<ExpenseItem> = {
      purchasedOn: this.formControls.purchasedOn.value,
      nature: this.formControls.nature.value,
      originalAmount: {
        amount: parseFloat(this.formControls.amount.value),
        currency: this.formControls.currency.value,
      },
      convertedAmount: {
        amount: parseFloat(this.formControls.convertedAmount.value),
        currency: convertedAmountCurrency,
      },
      comment: this.formControls.comment.value,
    };

    let saveObservable: Observable<void>;
    if (this.isCreate) {
      saveObservable = this.expenseService.createExpense(expense);
    } else {
      saveObservable = this.expenseService.updateExpense(
        this.formControls.id.value,
        expense,
      );
    }

    saveObservable.subscribe({
      complete: () => {
        this.messageService.add({
          severity: "success",
          summary: $localize`:@@expenseSaved:Expense saved`,
        });

        this.expenseUpdate.emit();
        if (saveAndAdd) {
          this.form.reset();
          this.form.patchValue({
            purchasedOn: this.defaultDate,
            currency: this.defaultCurrencyCode,
          });
        } else {
          this.close();
        }
      },
    });
  }

  private calculateEuroAmount(source: string, amount: number): number {
    return this.currencyQuery.getRate(source, convertedAmountCurrency) * amount;
  }

  private setEuroAmount(source: string, amount: number): void {
    if (source && amount) {
      const euroAmount: number = this.calculateEuroAmount(source, amount);
      this.formControls.convertedAmount.setValue(euroAmount);
    }
  }

  private setCreateLabel(): void {
    this.header = $localize`:@@expenseDialogNewExpenseHeader:New expense`;
    this.saveButtonLabel = $localize`:@@expenseDialogCreateButton:Create`;
  }
}
