import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.scss",
})
export class ProductCardComponent {
  @Output() onClick: EventEmitter<string> = new EventEmitter();
  productId = "dsgtyfdsvgvsd"
}
