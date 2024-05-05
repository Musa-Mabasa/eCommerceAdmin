import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matShoppingCartOutline } from "@ng-icons/material-icons/outline";
import { CorrelatedProduct } from "../../models/admin";

@Component({
  selector: "app-preview-card",
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: "./preview-card.component.html",
  styleUrl: "./preview-card.component.scss",
  viewProviders: [
    provideIcons({
      matShoppingCartOutline,
    }),
  ],
})
export class PreviewCardComponent {
  @Input() product: CorrelatedProduct | undefined;
  @Output() onClick: EventEmitter<CorrelatedProduct> = new EventEmitter();
  @Output() onAddToCart: EventEmitter<CorrelatedProduct> = new EventEmitter();

  addToCartClick(event: Event) {
    event.stopPropagation();
    this.onAddToCart.emit(this.product);
  }
}
