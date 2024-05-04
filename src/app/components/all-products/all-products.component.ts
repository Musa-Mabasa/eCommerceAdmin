import { Component, inject } from "@angular/core";
import { PreviewCardComponent } from "../preview-card/preview-card.component";
import { Router } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matArrowForwardOutline,
  matFilterListOutline,
} from "@ng-icons/material-icons/outline";
import { AsyncPipe, NgIf } from "@angular/common";
import { Store } from "@ngrx/store";
import { AdminState } from "../../adminStore/reducer";
import {
  getAllProducts,
  getCategories,
  getTags,
} from "../../previewStore/actions";
import {
  selectAllProductsWithTags,
  selectCategories,
  selectTags,
} from "../../previewStore/selectors";

@Component({
  selector: "app-all-products",
  standalone: true,
  imports: [PreviewCardComponent, NgIconComponent, NgIf, AsyncPipe],
  templateUrl: "./all-products.component.html",
  styleUrl: "./all-products.component.scss",
  viewProviders: [
    provideIcons({ matFilterListOutline, matArrowForwardOutline }),
  ],
})
export class AllProductsComponent {
  router = inject(Router);
  store = inject(Store<AdminState>);
  allProducts$ = this.store.select(selectAllProductsWithTags);
  categories$ = this.store.select(selectCategories);
  tags$ = this.store.select(selectTags);
  category = "";
  tags = ["Shoes", "Sport", "Kitchen", "Technology", "Gaming", "Clothes"];
  selectedTags: string[] = [];
  selectedPriceRangeType = "Equals";
  priceRangeTypes = ["Equals", "Less Than", "More Than", "Between"];
  userCurrency = "ZAR";

  constructor() {
    this.store.dispatch(getAllProducts());
    this.store.dispatch(getCategories());
    this.store.dispatch(getTags());
  }

  routeToProduct(event: string) {
    this.router.navigate([`home/preview-product/${event}`]);
  }
}
