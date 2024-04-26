import { Component, inject } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matCheck, matPlus, matSort } from "@ng-icons/material-icons/baseline";
import { ProductCardComponent } from "../product-card/product-card.component";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-products",
  standalone: true,
  templateUrl: "./admin-products.component.html",
  styleUrl: "./admin-products.component.scss",
  viewProviders: [provideIcons({ matPlus, matSort, matCheck })],
  imports: [NgIconComponent, ProductCardComponent, NgIf],
})
export class AdminProductsComponent {
  tags = [
    "All products",
    "Shoes",
    "Sport",
    "Kitchen",
    "Technology",
    "Gaming",
    "Clothes",
  ];
  currentTag = "All products";
  sortBy = "price";
  router = inject(Router);

  routeToEdit(event: string) {
    this.router.navigate([`home/edit-product/${event}`]);
  }
}
