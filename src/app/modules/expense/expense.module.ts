import { NgModule } from "@angular/core";
import { ExpenseComponent } from "./pages/expense/expense.component";
import { ExpenseListComponent } from "./components/expense-list/expense-list.component";
import { ExpenseHeaderComponent } from "./components/expense-header/expense-header.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { ExpenseDialogComponent } from "./components/expense-dialog/expense-dialog.component";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { KeyFilterModule } from "primeng/keyfilter";
import { InputTextareaModule } from "primeng/inputtextarea";
import { PaginatorModule } from "primeng/paginator";

@NgModule({
  declarations: [
    ExpenseComponent,
    ExpenseListComponent,
    ExpenseHeaderComponent,
    ExpenseDialogComponent,
  ],
  exports: [ExpenseComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CalendarModule,
    KeyFilterModule,
    InputTextareaModule,
    PaginatorModule,
  ],
})
export class ExpenseModule {}
