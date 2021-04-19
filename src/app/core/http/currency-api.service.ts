import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConfigService } from "src/app/config/config.service";
import { Currency } from "src/app/modules/expense/state/currency/currency.model";

@Injectable({
  providedIn: "root",
})
export class CurrencyApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService,
  ) {}

  public getCurrencyList(): Observable<Array<Currency>> {
    const url: string = `${this.configService.config.currencyApiEndpoint}currencies`;
    return this.http.get<Array<Currency>>(url);
  }
}
