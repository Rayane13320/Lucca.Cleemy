import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { SelectItem } from "primeng/api";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CurrencyService } from "src/app/modules/expense/state/currency/currency.service";
import { toSelectItems } from "src/app/shared/functions/select-item.function";
import { CurrencyQuery } from "../../state/currency/currency.query";
import {
  convertedAmountCurrency,
  defaultSelectedCurrency,
} from "../../state/expense/expense.model";
import { ExpenseQuery } from "../../state/expense/expense.query";

@Component({
  selector: "app-expense-header",
  templateUrl: "./expense-header.component.html",
  styleUrls: ["./expense-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseHeaderComponent {
  public defaultCurrency: string = defaultSelectedCurrency;
  constructor(
    private readonly currencyService: CurrencyService,
    public readonly currencyQuery: CurrencyQuery,
    public readonly expenseQuery: ExpenseQuery,
  ) {
    currencyService
      .getCurrencyList()
      .subscribe(() =>
        this.currencyService.selectCurrency(defaultSelectedCurrency),
      );
  }

  public selectCurrency(event: { value: string }): void {
    this.currencyService.selectCurrency(event.value);
  }
}
