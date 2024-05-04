import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, map, switchMap } from "rxjs";
import { Product } from "../models/admin";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { PreviewService } from "../services/preview.service";
import { getAllProducts, getAllProductsComplete } from "./actions";

@Injectable()
export class PreviewEffects {
  constructor(
    private actions$: Actions,
    private previewService: PreviewService,
    private notification: NzNotificationService
  ) {}

  getAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllProducts.type),
      switchMap(() =>
        this.previewService.getAllProducts().pipe(
          map((allProducts) => getAllProductsComplete({ allProducts })),
          catchError((err) => {
            this.notification.create("error", "Sign In failed", err.message);
            return EMPTY;
          })
        )
      )
    )
  );
}
