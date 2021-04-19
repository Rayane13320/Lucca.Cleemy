import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ignoreElements, tap } from "rxjs/operators";
import { Currency } from "src/app/modules/expense/state/currency/currency.model";
import { mapToVoid } from "src/app/shared/operators/map-to-void.operator";
import { CurrencyApiService } from "../../../../core/http/currency-api.service";
import { CurrencyStore } from "./currency.store";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  constructor(
    private readonly currencyLayerApiService: CurrencyApiService,
    private readonly store: CurrencyStore,
  ) {}

  public getCurrencyList(): Observable<void> {
    return this.currencyLayerApiService.getCurrencyList().pipe(
      tap((x) => this.store.set(x)),
      mapToVoid(),
    );
  }

  public selectCurrency(code: string): void {
    this.store.setActive(code);
  }
}
