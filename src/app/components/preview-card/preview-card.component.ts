import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matShoppingCartOutline } from "@ng-icons/material-icons/outline";
import { CorrelatedProduct, Data } from "../../models/admin";
import { CurrencyPipe, NgIf } from "@angular/common";
import { user } from "@angular/fire/auth";

@Component({
  selector: "app-preview-card",
  standalone: true,
  imports: [NgIconComponent, CurrencyPipe, NgIf],
  templateUrl: "./preview-card.component.html",
  styleUrl: "./preview-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      matShoppingCartOutline,
    }),
  ],
})
export class PreviewCardComponent {
  @Input() product: CorrelatedProduct | undefined;
  @Input() conversionData: Data | undefined | null;
  @Input() userCurrency: string | undefined | null;
  @Output() onClick: EventEmitter<CorrelatedProduct> = new EventEmitter();
  @Output() onAddToCart: EventEmitter<CorrelatedProduct> = new EventEmitter();

  getPrice(baseValue: number | undefined, conversionRate: number | undefined) {
    if (baseValue && conversionRate)
      return (baseValue / conversionRate).toFixed(2);
    else return baseValue;
  }

  addToCartClick(event: Event) {
    event.stopPropagation();
    this.onAddToCart.emit(this.product);
  }
}
