import { Component, inject } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matCheck, matPlus, matSort } from "@ng-icons/material-icons/baseline";
import { ProductCardComponent } from "../product-card/product-card.component";
import { AsyncPipe, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AdminState } from "../../adminStore/reducer";
import { selectAdminProductsWithTags } from "../../adminStore/selectors";
import { getAdminProducts } from "../../adminStore/actions";
import { getCookie } from "../../utils/utils";

@Component({
  selector: "app-admin-products",
  standalone: true,
  templateUrl: "./admin-products.component.html",
  styleUrl: "./admin-products.component.scss",
  viewProviders: [provideIcons({ matPlus, matSort, matCheck })],
  imports: [NgIconComponent, ProductCardComponent, NgIf, AsyncPipe],
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
  store = inject(Store<AdminState>);
  myProducts$ = this.store.select(selectAdminProductsWithTags);

  constructor() {
    this.store.dispatch(getAdminProducts({ adminId: getCookie("userId") }));
  }

  routeToEdit(event: string) {
    this.router.navigate([`home/edit-product/${event}`]);
  }
}
