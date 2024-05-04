import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, map, switchMap } from "rxjs";
import { Product } from "../models/admin";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { PreviewService } from "../services/preview.service";
import {
  getAllProducts,
  getAllProductsComplete,
  getCart,
  getCartComplete,
  getCategories,
  getCategoriesComplete,
  getTags,
  getTagsComplete,
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

  getTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTags.type),
      switchMap(() =>
        this.previewService.getTags().pipe(
          map((tags) => getTagsComplete({ tags })),
          catchError((err) => {
            this.notification.create(
              "error",
              "Failed to get tags",
              err.message
            );
            return EMPTY;
          })
        )
      )
    )
  );

  getCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCart.type),
      switchMap(({ userId }: { userId: string }) =>
        this.previewService.getCart(userId).pipe(
          map((cart) => getCartComplete({ cart: cart[0] })),
          catchError((err) => {
            this.notification.create(
              "error",
              "Failed to get cart",
              err.message
            );
            return EMPTY;
          })
        )
      )
    )
  );
}
