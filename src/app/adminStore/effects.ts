import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AdminService } from "../services/admin.service";
import {
    getAdminCart,
  getAdminCartComplete,
  getAdminProducts,
  getAdminProductsComplete,
  getAllStoreProducts,
  getAllStoreProductsComplete,
} from "./actions";
import { EMPTY, catchError, map, switchMap } from "rxjs";

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private adminService: AdminService) {}

  getAdminProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAdminProducts.type),
      switchMap((adminId) =>
        this.adminService.getAdminProducts(adminId).pipe(
          map((adminProducts) => getAdminProductsComplete({ adminProducts })),
          catchError((err) => EMPTY)
        )
      )
    )
  );

  getAllStoreProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllStoreProducts.type),
      switchMap(() =>
        this.adminService.getAllStoreProducts().pipe(
          map((allProducts) => getAllStoreProductsComplete({ allProducts })),
          catchError((err) => EMPTY)
        )
      )
    )
  );

  getAdminCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAdminCart.type),
      switchMap((adminId) =>
        this.adminService.getAdminCart(adminId).pipe(
          map((cart) => getAdminCartComplete({ cart })),
          catchError((err) => EMPTY)
        )
      )
    )
  );
}
