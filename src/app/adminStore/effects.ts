import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AdminService } from "../services/admin.service";
import {
  addProduct,
  addProductComplete,
  addProductError,
  getAdminProducts,
  getAdminProductsComplete,
  getAllTags,
  getAllTagsComplete,
} from "./actions";
import { EMPTY, catchError, map, switchMap } from "rxjs";
import { Product } from "../models/admin";
import { NzNotificationService } from "ng-zorro-antd/notification";

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private adminService: AdminService,
    private notification: NzNotificationService
  ) {}

  getAdminProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAdminProducts.type),
      switchMap(({adminId}: {adminId: string}) =>
        this.adminService.getAdminProducts(adminId ).pipe(
          map((adminProducts) => {
            console.log("prod ", adminProducts);
            return getAdminProductsComplete({ adminProducts });
          }),
          catchError((err) => {
            this.notification.create("error", "Sign In failed", err.message);
            return EMPTY;
          })
        )
      )
    )
  );

  getAllTags$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTags.type),
      switchMap(() =>
        this.adminService.getAllTags().pipe(
          map((allTags) => getAllTagsComplete({ allTags })),
          catchError((err) => {
            this.notification.create("error", "Sign In failed", err.message);
            return EMPTY;
          })
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct.type),
      switchMap(
        (productWithFile: {
          productWithFile: { product: Product; file?: File };
        }) => {
          console.log(productWithFile.productWithFile);

          return this.adminService
            .addProduct(productWithFile.productWithFile)
            .pipe(
              map(() => {
                this.notification.create(
                  "success",
                  "Success",
                  "product added Successfully"
                );
                return addProductComplete();
              }),
              catchError((err) => {
                this.notification.create(
                  "error",
                  "Failed to add product",
                  err.message
                );
                addProductError();
                return EMPTY;
              })
            );
        }
      )
    )
  );
}
