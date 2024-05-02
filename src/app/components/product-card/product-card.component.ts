import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CorrelatedProduct } from "../../models/admin";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matDelete, matEdit } from "@ng-icons/material-icons/baseline";

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.scss",
  viewProviders: [provideIcons({ matDelete, matEdit })],
})
export class ProductCardComponent {
  @Output() editOnClick: EventEmitter<string> = new EventEmitter();
  @Output() deleteOnClick: EventEmitter<string> = new EventEmitter();
  @Input() product: CorrelatedProduct | undefined;
}
