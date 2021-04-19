import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "currencyConvert",
})
export class CurrencyConvertPipe implements PipeTransform {
  transform(value: number, rate: number): number {
    return value * rate;
  }
}
