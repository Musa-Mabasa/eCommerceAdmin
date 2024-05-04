import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, map, switchMap } from "rxjs";
import { Product } from "../models/admin";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { PreviewService } from "../services/preview.service";
import {
  getAllProducts,
  getAllProductsComplete,
  getCategories,
  getCategoriesComplete,
} from "./actions";

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
            this.notification.create(
              "error",
              "Failed to get products",
              err.message
            );
            return EMPTY;
          })
        )
      )
    )
  );

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCategories.type),
      switchMap(() =>
        this.previewService.getCategories().pipe(
          map((categories) => getCategoriesComplete({ categories })),
          catchError((err) => {
            this.notification.create(
              "error",
              "Failed to get categories",
              err.message
            );
            return EMPTY;
          })
        )
      )
    )
  );
}
