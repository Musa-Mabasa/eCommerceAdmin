import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "currencyConversion",
  standalone: true,
})
export class CurrencyConversionPipe implements PipeTransform {
  transform(value?: number, conversionRate?: number) {
    if (value && conversionRate) return (value / conversionRate).toFixed(2);
    else return value;
  }
}
