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
import { CurrencyConversionPipe } from "../../pipes/currency-conversion.pipe";

@Component({
  selector: "app-product-card",
  standalone: true,
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ matDelete, matEdit })],
  imports: [NgIconComponent, CurrencyPipe, NgIf, CurrencyConversionPipe],
})
export class ProductCardComponent {
  @Output() editOnClick: EventEmitter<Product> = new EventEmitter();
  @Output() deleteOnClick: EventEmitter<string> = new EventEmitter();
  @Input() product: CorrelatedProduct | undefined;
  @Input() conversionData: Data | undefined | null;
  @Input() userCurrency: string | undefined | null;
}
