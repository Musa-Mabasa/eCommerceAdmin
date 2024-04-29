import { Component, inject } from "@angular/core";
import { PreviewCardComponent } from "../preview-card/preview-card.component";
import { Router } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matFilterListOutline } from "@ng-icons/material-icons/outline";

@Component({
  selector: "app-all-products",
  standalone: true,
  imports: [PreviewCardComponent, NgIconComponent],
  templateUrl: "./all-products.component.html",
  styleUrl: "./all-products.component.scss",
  viewProviders: [provideIcons({ matFilterListOutline })],
})
export class AllProductsComponent {
  router = inject(Router);
  category = "";
  tags = [
    "All products",
    "Shoes",
    "Sport",
    "Kitchen",
    "Technology",
    "Gaming",
    "Clothes",
  ];

  routeToEdit(event: string) {
    this.router.navigate([`home/edit-product/${event}`]);
  }
}
