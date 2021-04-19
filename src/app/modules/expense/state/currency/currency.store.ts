import { Injectable } from "@angular/core";
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
} from "@datorama/akita";
import { Currency } from "./currency.model";

export interface CurrencyState
  extends EntityState<Currency, string>,
    ActiveState<string> {}

@Injectable({ providedIn: "root" })
@StoreConfig({ name: "Currency", idKey: "code" })
export class CurrencyStore extends EntityStore<CurrencyState> {
  constructor() {
    super();
  }
}
