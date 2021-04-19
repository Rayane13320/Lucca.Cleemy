import { NgModule } from "@angular/core";
import { ConfirmDirective } from "./directives/confirm/confirm.directive";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CurrencyConvertPipe } from "./pipes/currency-convert.pipe";

@NgModule({
  declarations: [ConfirmDirective, CurrencyConvertPipe],
  imports: [CommonModule, FlexLayoutModule],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ConfirmDirective,
    CurrencyConvertPipe,
  ],
})
export class SharedModule {}
