import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { CurrencyExhangeRates } from "../models/admin";
import { currencyAPI_KEY } from "../../../environment/environment";
import { EMPTY, Observable, catchError, from } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CurrencyService {
  currencyAPi = inject(HttpClient);

  getCurrencyExchangeRates(userCurrency: string) {
    return this.currencyAPi
      .get<CurrencyExhangeRates>(
        `ttps://api.currencyapi.com/v3/latest?apikey=${currencyAPI_KEY}&currencies=EUR%2CUSD%2CGBP%2CZAR&base_currency=${userCurrency}`
      )
      .pipe(
        catchError((err) => {
          switch (userCurrency) {
            case "ZAR":
              return this.currencyAPi.get<CurrencyExhangeRates>(
                "assets/currencyFallBackData/ZARAsBase.json"
              );
            case "USD":
              return this.currencyAPi.get<CurrencyExhangeRates>(
                "assets/currencyFallBackData/USDAsBase.json"
              );
            case "EUR":
              return this.currencyAPi.get<CurrencyExhangeRates>(
                "assets/currencyFallBackData/EURAsBase.json"
              );
            case "GBP":
              return this.currencyAPi.get<CurrencyExhangeRates>(
                "assets/currencyFallBackData/GBPAsBase.json"
              );
            default:
              return EMPTY;
          }
        })
      );
  }
}
