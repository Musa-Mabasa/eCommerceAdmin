import { Component, inject } from "@angular/core";
import { PreviewCardComponent } from "../preview-card/preview-card.component";
import { Router } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matArrowForwardOutline, matFilterListOutline } from "@ng-icons/material-icons/outline";
import { NgIf } from "@angular/common";

@Component({
  selector: "app-all-products",
  standalone: true,
  imports: [PreviewCardComponent, NgIconComponent, NgIf],
  templateUrl: "./all-products.component.html",
  styleUrl: "./all-products.component.scss",
  viewProviders: [provideIcons({ matFilterListOutline, matArrowForwardOutline })],
})
export class AllProductsComponent {
  router = inject(Router);
  category = "";
  tags = [
    "Shoes",
    "Sport",
    "Kitchen",
    "Technology",
    "Gaming",
    "Clothes",
  ];
  selectedTags: string[] = [];
  selectedPriceRangeType = "Equals";
  priceRangeTypes = ["Equals", "Less Than", "More Than", "Between"];
  userCurrency = "ZAR";

  routeToProduct(event: string) {
    this.router.navigate([`home/preview-product/${event}`]);
  }
}
