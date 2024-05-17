import { Component, inject } from "@angular/core";
import { SummaryComponent } from "../summary/summary.component";
import { DashboardOrdersComponent } from "../dashboard-orders/dashboard-orders.component";
import { StockItemComponent } from "../stock-item/stock-item.component";
import { SalesChartComponent } from "../sales-chart/sales-chart.component";
import { DashboardState } from "../../dashboardStore/reducer";
import { Store } from "@ngrx/store";
import {
  selectOrderItems,
  selectOrdersLoadingState,
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
import { getAdminProducts } from "../../adminStore/actions";
import { getCookie } from "../../utils/utils";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    SummaryComponent,
    DashboardOrdersComponent,
    StockItemComponent,
    SalesChartComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  store = inject(Store<DashboardState>);
  prodStore = inject(Store<AdminState>);
  orders$ = this.store.select(selectOrderItems);
  productsSold$ = this.store.select(selectProductsSold);
  soldIncrease$ = this.store.select(selectProductsSoldIncrease);
  revenue$ = this.store.select(selectRevenue);
  revenueIncrease$ = this.store.select(selectRevenueIncrease);
  loadingState$ = this.store.select(selectOrdersLoadingState);
  totalCustomers$ = this.store.select(selectTotalCustomers);
  totalCustomersIncrease$ = this.store.select(selectTotalCustomersIncrease);
  totalQuantity$ = this.store.select(selectTotalQuantity);
  totalQuantityDecrease$ = this.store.select(selectTotalQuantityDecrease);
  stockReport$ = this.store.select(selectStockReport);
  topProducts$ = this.store.select(selectTopProducts);

  constructor() {
    this.prodStore.dispatch(getAdminProducts({ adminId: getCookie("userId") }));
    this.store.dispatch(getOrders());
  }
}
