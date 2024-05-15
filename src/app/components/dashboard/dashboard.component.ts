import { Component } from "@angular/core";
import { SummaryComponent } from "../summary/summary.component";
import { DashboardOrdersComponent } from "../dashboard-orders/dashboard-orders.component";
import { StockItemComponent } from "../stock-item/stock-item.component";
import { SalesChartComponent } from "../sales-chart/sales-chart.component";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    SummaryComponent,
    DashboardOrdersComponent,
    StockItemComponent,
    SalesChartComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {}
