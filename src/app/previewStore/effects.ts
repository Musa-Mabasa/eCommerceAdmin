import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, catchError, map, switchMap } from "rxjs";
import { CorrelatedProduct } from "../models/admin";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { PreviewService } from "../services/preview.service";
import {
  addProductToCart,
  addProductToCartComplete,
  deleteProductFromCart,
  deleteProductFromCartComplete,
  getAllProducts,
  getAllProductsComplete,
  getCart,
  getCartComplete,
  getCategories,
  getCategoriesComplete,
  getTags,
  getTagsComplete,
  getUserCarts,
  getUserCartsComplete,
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
          switchMap((cart) => [
            getUserCarts({ cartId: cart[0].id }),
            getCartComplete({ cart: cart[0] }),
          ]),
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

  getUserCarts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserCarts.type),
      switchMap(({ cartId }: { cartId: string }) =>
        this.previewService.getUserCarts(cartId).pipe(
          map((userCarts) => getUserCartsComplete({ userCarts })),
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

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProductToCart.type),
      switchMap(
        ({
          productToAdd,
        }: {
          productToAdd: { cartId: string; product: CorrelatedProduct };
        }) =>
          this.previewService
            .addProductToCart(productToAdd.cartId, productToAdd.product)
            .pipe(
              map(() => addProductToCartComplete()),
              catchError((err) => {
                this.notification.create(
                  "error",
                  "Failed to add product",
                  err.message
                );
                return EMPTY;
              })
            )
      )
    )
  );

  deletProductFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductFromCart.type),
      switchMap(
        ({
          productToDelete,
        }: {
          productToDelete: { cartId: string; productId: string };
        }) =>
          this.previewService
            .deleteProductFromCart(
              productToDelete.cartId,
              productToDelete.productId
            )
            .pipe(
              map(() => deleteProductFromCartComplete()),
              catchError((err) => {
                this.notification.create(
                  "error",
                  "Failed to delete product",
                  err.message
                );
                return EMPTY;
              })
            )
      )
    )
  );
}