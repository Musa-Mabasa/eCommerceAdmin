import { Component, EventEmitter, Input, Output } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matDelete } from "@ng-icons/material-icons/baseline";
import { CorrelatedProduct, Product } from "../../models/admin";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-cart-item",
  standalone: true,
  imports: [NgIconComponent, NgIf],
  templateUrl: "./cart-item.component.html",
  styleUrl: "./cart-item.component.scss",
  viewProviders: [provideIcons({ matDelete })],
})
export class CartItemComponent {
  @Input() product: Product | undefined;
  @Output() onDelete: EventEmitter<string> = new EventEmitter();
}
