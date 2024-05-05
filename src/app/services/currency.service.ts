import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CurrencyExhangeRates } from "../models/admin";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  currencyAPi = inject(HttpClient);

  getCurrencyExchangeRates(userCurrency: string) {
    return this.currencyAPi.get<CurrencyExhangeRates>(
      `https://api.currencyapi.com/v3/latest?apikey=cur_live_QntszarIE7kEs00Ebmm7V8rEeyVNYfYmDNC8lbb7&currencies=EUR%2CUSD%2CGBP%2CZAR&base_currency=${userCurrency}`
    );
  }
}
