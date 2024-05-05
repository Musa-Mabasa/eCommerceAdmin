import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { CorrelatedProduct, Product } from "../../models/admin";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matDelete, matEdit } from "@ng-icons/material-icons/baseline";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ matDelete, matEdit })],
})
export class ProductCardComponent {
  @Output() editOnClick: EventEmitter<Product> = new EventEmitter();
  @Output() deleteOnClick: EventEmitter<string> = new EventEmitter();
  @Input() product: CorrelatedProduct | undefined;
}
