import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AdminService } from "../services/admin.service";
import {
  addProduct,
  addProductComplete,
  addProductError,
  addTag,
  addTagComplete,
  deleteProduct,
  deleteProductComplete,
  editProduct,
  editProductComplete,
  editProductError,
  getAdminProducts,
  getAdminProductsComplete,
  getAllTags,
  getAllTagsComplete,
  getCategories,
  getCategoriesComplete,
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
      switchMap(({ adminId }: { adminId: string }) =>
        this.adminService.getAdminProducts(adminId).pipe(
          map((adminProducts) => getAdminProductsComplete({ adminProducts })),
          catchError((err) => {
            this.notification.create(
              "error",
              "Failed to get Products",
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
        this.adminService.getCategories().pipe(
          map((categories) => getCategoriesComplete({ categories })),
          catchError((err) => {
            this.notification.create(
              "error",
              "Failed to fetch categories",
              err.message
            );
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
        ({
          productWithFile,
        }: {
          productWithFile: { product: Product; file?: File };
        }) =>
          this.adminService.addProduct(productWithFile).pipe(
            map(() => {
              this.notification.create(
                "success",
                "Success",
                "Product Added Successfully"
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
          )
      )
    )
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editProduct.type),
      switchMap(
        ({
          productWithFile,
        }: {
          productWithFile: { product: Product; file?: File };
        }) =>
          this.adminService.editProduct(productWithFile).pipe(
            map(() => {
              this.notification.create(
                "success",
                "Success",
                "Product Edited Successfully"
              );

              return editProductComplete();
            }),
            catchError((err) => {
              this.notification.create(
                "error",
                "Failed to add product",
                err.message
              );
              editProductError();
              return EMPTY;
            })
          )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct.type),
      switchMap(({ productId }: { productId: string }) =>
        this.adminService.deleteProduct(productId).pipe(
          map(() => deleteProductComplete()),
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

  addTag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTag.type),
      switchMap(({ tag }: { tag: { name: string; productId: string } }) =>
        this.adminService.addTag(tag.name, tag.productId).pipe(
          map(() => {
            this.notification.create(
              "success",
              "Success",
              "Tag Added Successfully"
            );
            return addTagComplete();
          }),
          catchError((err) => {
            this.notification.create("error", "Failed to add Tag", err.message);
            addTagComplete();
            return EMPTY;
          })
        )
      )
    )
  );
}
