import { Component, inject } from "@angular/core";
import { PreviewCardComponent } from "../preview-card/preview-card.component";
import { Data, Router } from "@angular/router";
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
  setProductToView,
  setSearchTerm,
} from "../../previewStore/actions";
import {
  selectAllProductsLoading,
  selectAllProductsWithTags,
  selectCart,
  selectCategories,
  selectCurrency,
  selectCurrencyConversion,
  selectSelectedTags,
  selectTags,
} from "../../previewStore/selectors";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { PreviewState } from "../../previewStore/reducer";
import { CorrelatedProduct } from "../../models/admin";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AllProductsSkeletonComponent } from "../skeletons/all-products-skeleton/all-products-skeleton.component";

@Component({
  selector: "app-all-products",
  standalone: true,
  templateUrl: "./all-products.component.html",
  styleUrl: "./all-products.component.scss",
  viewProviders: [
    provideIcons({ matFilterListOutline, matArrowForwardOutline }),
  ],
  imports: [
    PreviewCardComponent,
    NgIconComponent,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    AllProductsSkeletonComponent,
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
  cart$ = this.store.select(selectCart);
  isLoading$ = this.store.select(selectAllProductsLoading);
  conversionData$ = this.store.select(selectCurrencyConversion);
  userCurrency$ = this.store.select(selectCurrency);
  conversionData?: Data;
  userCurrency = "";
  selectedPriceRangeType = "None";
  priceRangeTypes = ["None", "Equals", "Less Than", "More Than", "Between"];
  cartId? = "";

  constructor() {
    this.store.dispatch(getAllProducts());
    this.store.dispatch(getCategories());
    this.store.dispatch(getTags());

    this.cart$.pipe(takeUntilDestroyed()).subscribe((cart) => {
      this.cartId = cart?.id;
    });

    this.conversionData$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.conversionData = data;
    });

    this.userCurrency$.pipe(takeUntilDestroyed()).subscribe((userCurrency) => {
      this.userCurrency = userCurrency;
    });
  }

  routeToProduct(productToView: CorrelatedProduct) {
    this.store.dispatch(setProductToView({ productToView }));
    this.router.navigate([`home/preview-product/${productToView.product.id}`]);
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
        lowerPriceBound: this.getPrice(
          Number(this.lowerBoundPrice.value),
          this.conversionData?.[this.userCurrency].value
        ),
      })
    );

    this.store.dispatch(
      selectUpperPriceBound({
        upperPriceBound: this.getPrice(
          Number(this.upperBoundPrice.value),
          this.conversionData?.[this.userCurrency].value
        ),
      })
    );
  }

  getPrice(baseValue: number, conversionRate: number | undefined) {
    if (baseValue && conversionRate)
      return Number((baseValue / conversionRate).toFixed(2));
    else return baseValue;
  }

  onSearch(event: Event) {
    if (event?.target) {
      this.store.dispatch(
        setSearchTerm({ searchTerm: (event.target as HTMLInputElement).value })
      );
    }
  }

  addProductToCart(product: CorrelatedProduct) {
    if (this.cartId)
      this.store.dispatch(
        addProductToCart({ productToAdd: { cartId: this.cartId, product } })
      );
  }
}
