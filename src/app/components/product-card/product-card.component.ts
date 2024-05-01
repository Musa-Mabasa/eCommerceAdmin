import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CorrelatedProduct } from "../../models/admin";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.scss",
})
export class ProductCardComponent {
  @Output() onClick: EventEmitter<string> = new EventEmitter();
  @Input() product: CorrelatedProduct | undefined;
}
