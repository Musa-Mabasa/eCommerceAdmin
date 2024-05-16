import { CurrencyPipe } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-dashboard-orders",
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: "./dashboard-orders.component.html",
  styleUrl: "./dashboard-orders.component.scss",
})
export class DashboardOrdersComponent {
  @Input() customerName?: string;
  @Input() customerAvatar?: string;
  @Input() orderName?: string;
  @Input() orderDate?: string;
  @Input() orderPrice?: number;
  @Input() orderCurrency?: string;
}
