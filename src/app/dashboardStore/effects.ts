import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { DashboardService } from "../services/dashboard.service";
import { getOrders, getOrdersComplete } from "./actions";
import { EMPTY, catchError, map, switchMap } from "rxjs";

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private notification: NzNotificationService
  ) {}

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrders.type),
      switchMap(() =>
        this.dashboardService.getOrders().pipe(
          map((orders) => {
            console.log(orders);

            return getOrdersComplete({ orders });
          }),
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
}
