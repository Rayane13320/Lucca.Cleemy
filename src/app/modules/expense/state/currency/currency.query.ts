import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import { SelectItem } from "primeng/api";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { toSelectItems } from "src/app/shared/functions/select-item.function";
import { Currency } from "./currency.model";
import { CurrencyStore, CurrencyState } from "./currency.store";

@Injectable({ providedIn: "root" })
export class CurrencyQuery extends QueryEntity<CurrencyState> {
  public currencies$: Observable<Array<SelectItem>> = this.selectAll().pipe(
    map((x) =>
      toSelectItems(
        x,
        (y) => y.code,
        (y) => `${y.name} - ${y.symbol}`,
      ),
    ),
  );

  public active$: Observable<Currency> = this.selectActive();

  constructor(protected store: CurrencyStore) {
    super(store);
  }

  public getRate(source: string, target: string): number {
    if (source === target) {
      return 1;
    }

    const currency: Currency = this.getAll({
      filterBy: (x) => x.code === source,
    })[0];
    const rate: number = currency.rates.find((x) => x.to === target).rate;
    return rate;
  }

  public selectCurrency(code: string): Observable<Currency> {
    return this.selectEntity(code);
  }
}
