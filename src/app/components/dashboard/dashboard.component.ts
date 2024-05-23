import { Component, inject } from "@angular/core";
import { SummaryComponent } from "../summary/summary.component";
import { DashboardOrdersComponent } from "../dashboard-orders/dashboard-orders.component";
import { StockItemComponent } from "../stock-item/stock-item.component";
import { SalesChartComponent } from "../sales-chart/sales-chart.component";
import { DashboardState } from "../../dashboardStore/reducer";
import { Store } from "@ngrx/store";
import {
  selectDashboardLoadingState,
  selectOrderItems,
  selectProductsSold,
  selectProductsSoldIncrease,
  selectRevenue,
  selectRevenueIncrease,
  selectStockReport,
  selectTopProducts,
  selectTotalCustomers,
  selectTotalCustomersIncrease,
  selectTotalQuantity,
  selectTotalQuantityDecrease,
} from "../../dashboardStore/selectors";
import { getOrders } from "../../dashboardStore/actions";
import { AsyncPipe, NgIf } from "@angular/common";
import { AdminState } from "../../adminStore/reducer";
import {
  getAdminProducts,
  setSelectEditProduct,
} from "../../adminStore/actions";
import { getCookie } from "../../utils/utils";
import {
  selectCurrency,
  selectCurrencyConversion,
} from "../../previewStore/selectors";
import { DashboardSkeletonComponent } from "../skeletons/dashboard-skeleton/dashboard-skeleton.component";
import { Router } from "@angular/router";
import { Product } from "../../models/admin";

@Component({
  selector: "app-dashboard",
  standalone: true,
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
  imports: [
    SummaryComponent,
    DashboardOrdersComponent,
    StockItemComponent,
    SalesChartComponent,
    AsyncPipe,
    NgIf,
    DashboardSkeletonComponent,
  ],
})
export class DashboardComponent {
  router = inject(Router);
  store = inject(Store<DashboardState>);
  prodStore = inject(Store<AdminState>);
  orders$ = this.store.select(selectOrderItems);
  productsSold$ = this.store.select(selectProductsSold);
  soldIncrease$ = this.store.select(selectProductsSoldIncrease);
  revenue$ = this.store.select(selectRevenue);
  revenueIncrease$ = this.store.select(selectRevenueIncrease);
  loadingState$ = this.store.select(selectDashboardLoadingState);
  totalCustomers$ = this.store.select(selectTotalCustomers);
  totalCustomersIncrease$ = this.store.select(selectTotalCustomersIncrease);
  totalQuantity$ = this.store.select(selectTotalQuantity);
  totalQuantityDecrease$ = this.store.select(selectTotalQuantityDecrease);
  stockReport$ = this.store.select(selectStockReport);
  topProducts$ = this.store.select(selectTopProducts);
  conversionData$ = this.store.select(selectCurrencyConversion);
  userCurrency$ = this.store.select(selectCurrency);

  constructor() {
    this.prodStore.dispatch(getAdminProducts({ adminId: getCookie("userId") }));
    this.store.dispatch(getOrders());
  }

  routeToEdit(product: Product) {
    this.store.dispatch(setSelectEditProduct({ productToEdit: product }));
    this.router.navigate([`home/edit-product/${product.id}`]);
  }
}
