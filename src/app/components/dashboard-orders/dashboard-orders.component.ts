import { CurrencyPipe, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { CurrencyConversionPipe } from "../../pipes/currency-conversion.pipe";
import { Data } from "../../models/admin";

@Component({
  selector: "app-dashboard-orders",
  standalone: true,
  imports: [CurrencyPipe, NgIf, CurrencyConversionPipe],
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
  @Input() userCurrency?: string;
  @Input() conversionData?: Data | null;
}
