import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matDelete } from "@ng-icons/material-icons/baseline";
import { CorrelatedProduct, Data, Product } from "../../models/admin";
import { CurrencyPipe, NgIf } from "@angular/common";

@Component({
  selector: "app-cart-item",
  standalone: true,
  imports: [NgIconComponent, NgIf, CurrencyPipe],
  templateUrl: "./cart-item.component.html",
  styleUrl: "./cart-item.component.scss",
  viewProviders: [provideIcons({ matDelete })],
})
export class CartItemComponent {
  @Input() product: Product | undefined;
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Input() conversionData: Data | undefined | null;
  @Input() userCurrency: string | undefined | null;

  getPrice(baseValue: number | undefined, conversionRate: number | undefined) {
    if (baseValue && conversionRate)
      return (baseValue / conversionRate).toFixed(2);
    else return baseValue;
  }
}
