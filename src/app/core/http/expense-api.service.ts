import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ignoreElements, map } from "rxjs/operators";
import { ConfigService } from "src/app/config/config.service";
import {
  ExpenseItem,
  ExpenseResults,
} from "src/app/modules/expense/state/expense/expense.model";
import { mapToVoid } from "src/app/shared/operators/map-to-void.operator";

@Injectable({
  providedIn: "root",
})
export class ExpenseApiService {
  constructor(
    private readonly http: HttpClient,
    private readonly configService: ConfigService,
  ) {}

  public getExpenses(
    pageNumber: number,
    pageLimit: number,
  ): Observable<ExpenseResults> {
    const url: string = `${this.configService.config.expenseApiEndpoint}expenseItems`;
    return this.http
      .get<Array<ExpenseItem>>(url, {
        observe: "response",
        params: {
          _page: pageNumber.toString(),
          _limit: pageLimit.toString(),
        },
      })
      .pipe(map((x) => this.ExpenseResultsResponseToExpenseResults(x)));
  }

  public createExpense(expense: Partial<ExpenseItem>): Observable<void> {
    const url: string = `${this.configService.config.expenseApiEndpoint}expenseItems`;
    return this.http.post(url, expense).pipe(mapToVoid());
  }

  public updateExpense(
    id: string,
    expense: Partial<ExpenseItem>,
  ): Observable<void> {
    const url: string = `${this.configService.config.expenseApiEndpoint}expenseItems/${id}`;
    return this.http.put(url, expense).pipe(mapToVoid());
  }

  public deleteExpense(id: string): Observable<void> {
    const url: string = `${this.configService.config.expenseApiEndpoint}expenseItems/${id}`;
    return this.http.delete(url).pipe(mapToVoid());
  }

  private ExpenseResultsResponseToExpenseResults(
    source: HttpResponse<Array<ExpenseItem>>,
  ): ExpenseResults {
    return {
      items: source.body.map((x) => ({
        ...x,
        purchasedOn: new Date(x.purchasedOn),
      })),
      total: parseInt(source.headers.get("X-Total-Count"), 10),
    };
  }
}
