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
} from "../../adminStore/selectors";
import { getAdminProducts, getCategories } from "../../adminStore/actions";
import { getCookie } from "../../utils/utils";
import { Subscription } from "rxjs";

@Component({
  selector: "app-admin-products",
  standalone: true,
  templateUrl: "./admin-products.component.html",
  styleUrl: "./admin-products.component.scss",
  viewProviders: [provideIcons({ matPlus, matSort, matCheck })],
  imports: [NgIconComponent, ProductCardComponent, NgIf, AsyncPipe],
})
export class AdminProductsComponent implements OnDestroy {
  sortBy = "price";
  router = inject(Router);
  store = inject(Store<AdminState>);
  categories$ = this.store.select(selectCategories);
  myProducts$ = this.store.select(selectAdminProductsWithTags);
  currentCategory = "";
  subscription: undefined | Subscription;

  constructor() {
    this.store.dispatch(getAdminProducts({ adminId: getCookie("userId") }));
    this.store.dispatch(getCategories());
    this.subscription = this.categories$.subscribe((cat) => {
      if (cat?.[0]?.name) this.currentCategory = cat[0].name;
    });
  }

  routeToEdit(event: string) {
    this.router.navigate([`home/edit-product/${event}`]);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
