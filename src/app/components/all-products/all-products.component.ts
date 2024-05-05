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
  addProductToCart,
  addToSelectedTags,
  getAllProducts,
  getCategories,
  getTags,
  removeFromSelectedTags,
  selectCategory,
  selectLowerPriceBound,
  selectPriceRangeType,
  selectUpperPriceBound,
  setSearchTerm,
} from "../../previewStore/actions";
import {
  selectAllProductsWithTags,
  selectCategories,
  selectSelectedTags,
  selectTags,
  selectUserCart,
} from "../../previewStore/selectors";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { PreviewState } from "../../previewStore/reducer";
import { CorrelatedProduct } from "../../models/admin";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-all-products",
  standalone: true,
  imports: [
    PreviewCardComponent,
    NgIconComponent,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
  ],
  templateUrl: "./all-products.component.html",
  styleUrl: "./all-products.component.scss",
  viewProviders: [
    provideIcons({ matFilterListOutline, matArrowForwardOutline }),
  ],
})
export class AllProductsComponent {
  router = inject(Router);
  store = inject(Store<PreviewState>);
  allProducts$ = this.store.select(selectAllProductsWithTags);
  categories$ = this.store.select(selectCategories);
  tags$ = this.store.select(selectTags);
  selectedCategory = new FormControl("All Products");
  lowerBoundPrice = new FormControl("");
  upperBoundPrice = new FormControl("");
  selectedTags$ = this.store.select(selectSelectedTags);
  userCart$ = this.store.select(selectUserCart);
  selectedPriceRangeType = "Equals";
  priceRangeTypes = ["None", "Equals", "Less Than", "More Than", "Between"];
  userCurrency = "ZAR";
  cartId? = "";

  constructor() {
    this.store.dispatch(getAllProducts());
    this.store.dispatch(getCategories());
    this.store.dispatch(getTags());

    this.userCart$.pipe(takeUntilDestroyed()).subscribe((cart) => {
      console.log(cart.cart?.id);

      this.cartId = cart.cart?.id;
    });
  }

  routeToProduct(event: string) {
    this.router.navigate([`home/preview-product/${event}`]);
  }

  selectCategory() {
    this.store.dispatch(
      selectCategory({ selectedCategory: this.selectedCategory?.value ?? "" })
    );
  }

  removeFromSelectedTags(tag: string) {
    this.store.dispatch(removeFromSelectedTags({ tag }));
  }

  addToSelectedTags(tag: string) {
    this.store.dispatch(addToSelectedTags({ tag }));
  }

  confirmFilters() {
    if (this.selectedPriceRangeType === "None") {
      this.store.dispatch(selectPriceRangeType({ priceRangeType: "" }));
      return;
    }
    this.store.dispatch(
      selectPriceRangeType({ priceRangeType: this.selectedPriceRangeType })
    );

    this.store.dispatch(
      selectLowerPriceBound({
        lowerPriceBound: Number(this.lowerBoundPrice.value) ?? undefined,
      })
    );

    this.store.dispatch(
      selectUpperPriceBound({
        upperPriceBound: Number(this.upperBoundPrice.value) ?? undefined,
      })
    );
  }

  onSearch(event: Event) {
    if (event?.target) {
      this.store.dispatch(
        setSearchTerm({ searchTerm: (event.target as HTMLInputElement).value })
      );
    }
  }

  addProductToCart(product: CorrelatedProduct) {
    console.log(this.cartId, product);

    if (this.cartId)
      this.store.dispatch(
        addProductToCart({ productToAdd: { cartId: this.cartId, product } })
      );
  }
}
