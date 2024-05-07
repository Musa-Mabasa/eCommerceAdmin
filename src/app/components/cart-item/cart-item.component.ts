import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matDelete } from "@ng-icons/material-icons/baseline";
import { CorrelatedProduct, Data, Product } from "../../models/admin";
import { CurrencyPipe, NgIf } from "@angular/common";
import { CurrencyConversionPipe } from "../../pipes/currency-conversion.pipe";

@Component({
  selector: "app-cart-item",
  standalone: true,
  templateUrl: "./cart-item.component.html",
  styleUrl: "./cart-item.component.scss",
  viewProviders: [provideIcons({ matDelete })],
  imports: [NgIconComponent, NgIf, CurrencyPipe, CurrencyConversionPipe],
})
export class CartItemComponent {
  @Input() product: Product | undefined;
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
  @Input() conversionData: Data | undefined | null;
  @Input() userCurrency: string | undefined | null;
}
