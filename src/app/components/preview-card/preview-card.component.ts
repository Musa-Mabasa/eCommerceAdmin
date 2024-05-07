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
import { CurrencyConversionPipe } from "../../pipes/currency-conversion.pipe";

@Component({
  selector: "app-preview-card",
  standalone: true,
  templateUrl: "./preview-card.component.html",
  styleUrl: "./preview-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      matShoppingCartOutline,
    }),
  ],
  imports: [NgIconComponent, CurrencyPipe, NgIf, CurrencyConversionPipe],
})
export class PreviewCardComponent {
  @Input() product: CorrelatedProduct | undefined;
  @Input() conversionData: Data | undefined | null;
  @Input() userCurrency: string | undefined | null;
  @Output() onClick: EventEmitter<CorrelatedProduct> = new EventEmitter();
  @Output() onAddToCart: EventEmitter<CorrelatedProduct> = new EventEmitter();

  addToCartClick(event: Event) {
    event.stopPropagation();
    this.onAddToCart.emit(this.product);
  }
}
