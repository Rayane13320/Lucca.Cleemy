import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-expense",
  templateUrl: "./expense.component.html",
  styleUrls: ["./expense.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpenseComponent {}
