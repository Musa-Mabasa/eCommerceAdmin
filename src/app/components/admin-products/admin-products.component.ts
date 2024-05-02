import { Component, OnDestroy, inject } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matCheck, matPlus, matSort } from "@ng-icons/material-icons/baseline";
import { ProductCardComponent } from "../product-card/product-card.component";
import { AsyncPipe, NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AdminState } from "../../adminStore/reducer";
import {
  selectAdminProductsWithTags,
  selectCategories,
  selectFilterBy,
  selectProductToEdit,
  selectSortBy,
} from "../../adminStore/selectors";
import {
  getAdminProducts,
  getCategories,
  setFilterBy,
  setSearchTerm,
  setSelectEditProduct,
  setSortBy,
} from "../../adminStore/actions";
import { getCookie } from "../../utils/utils";
import { Subscription } from "rxjs";
import { Product } from "../../models/admin";

@Component({
  selector: "app-admin-products",
  standalone: true,
  templateUrl: "./admin-products.component.html",
  styleUrl: "./admin-products.component.scss",
  viewProviders: [provideIcons({ matPlus, matSort, matCheck })],
  imports: [NgIconComponent, ProductCardComponent, NgIf, AsyncPipe],
})
export class AdminProductsComponent {
  router = inject(Router);
  store = inject(Store<AdminState>);
  categories$ = this.store.select(selectCategories);
  myProducts$ = this.store.select(selectAdminProductsWithTags);
  filterBy$ = this.store.select(selectFilterBy);
  sortBy$ = this.store.select(selectSortBy);
  subscription: undefined | Subscription;

  constructor() {
    this.store.dispatch(getAdminProducts({ adminId: getCookie("userId") }));
    this.store.dispatch(getCategories());
  }

  routeToEdit(event: Product) {
    this.store.dispatch(setSelectEditProduct({ productToEdit: event }));
    this.router.navigate([`home/edit-product/${event}`]);
  }

  setFilterBy(category: string) {
    this.store.dispatch(setFilterBy({ filterBy: category }));
  }

  setSortBy(sortField: string) {
    this.store.dispatch(setSortBy({ sortBy: sortField }));
  }

  onSearch(event: Event) {
    if (event?.target) {
      this.store.dispatch(
        setSearchTerm({ searchTerm: (event.target as HTMLInputElement).value })
      );
    }
  }
}
