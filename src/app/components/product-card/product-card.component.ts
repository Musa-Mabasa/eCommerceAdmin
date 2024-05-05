import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { CorrelatedProduct, Data, Product } from "../../models/admin";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matDelete, matEdit } from "@ng-icons/material-icons/baseline";
import { CurrencyPipe, NgIf } from "@angular/common";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [NgIconComponent, CurrencyPipe, NgIf],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ matDelete, matEdit })],
})
export class ProductCardComponent {
  @Output() editOnClick: EventEmitter<Product> = new EventEmitter();
  @Output() deleteOnClick: EventEmitter<string> = new EventEmitter();
  @Input() product: CorrelatedProduct | undefined;
  @Input() conversionData: Data | undefined | null;
  @Input() userCurrency: string | undefined | null;

  getPrice(baseValue: number | undefined, conversionRate: number | undefined) {
    if (baseValue && conversionRate)
      return (baseValue / conversionRate).toFixed(2);
    else return baseValue;
  }
}