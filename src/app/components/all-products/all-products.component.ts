import { Component, inject } from "@angular/core";
import { PreviewCardComponent } from "../preview-card/preview-card.component";
import { Data, Router, RouterLink } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matArrowForwardOutline,
  matFilterListOutline,
  matShoppingCartOutline,
} from "@ng-icons/material-icons/outline";
import { AsyncPipe, CurrencyPipe, NgIf } from "@angular/common";
import { Store } from "@ngrx/store";
import { AdminState } from "../../adminStore/reducer";
import {
  addProductToCart,
  addToSelectedTags,
  checkoutCart,
  deleteProductFromCart,
  getAllProducts,
  getCart,
  getCategories,
  getCurrencyConversion,
  getTags,
  removeFromSelectedTags,
  selectCategory,
  selectLowerPriceBound,
  selectPriceRangeType,
  selectUpperPriceBound,
  setCurrency,
  setProductToView,
  setSearchTerm,
} from "../../previewStore/actions";
import {
  selectAllProductsLoading,
  selectAllProductsWithTags,
  selectCart,
  selectCartTotal,
  selectCategories,
  selectCurrency,
  selectCurrencyConversion,
  selectIsCheckingoutState,
  selectSelectedTags,
  selectTags,
  selectUserCart,
  selectUserCartProducts,
} from "../../previewStore/selectors";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { PreviewState } from "../../previewStore/reducer";
import { CorrelatedProduct, UserCart } from "../../models/admin";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AllProductsSkeletonComponent } from "../skeletons/all-products-skeleton/all-products-skeleton.component";
import { AuthService } from "../../services/auth.service";
import { getCookie } from "../../utils/utils";
import { CartItemComponent } from "../cart-item/cart-item.component";
import {
  matSettings,
  matExitToApp,
  matHome,
  matShoppingCartCheckout,
  matCheck,
} from "@ng-icons/material-icons/baseline";
import { selectFromHome } from "../../adminStore/selectors";
import { insidePreview } from "../../adminStore/actions";
import { PreviewSplashComponent } from "../preview-splash/preview-splash.component";

@Component({
  selector: "app-all-products",
  standalone: true,
  templateUrl: "./all-products.component.html",
  styleUrl: "./all-products.component.scss",
  viewProviders: [
    provideIcons({
      matFilterListOutline,
      matArrowForwardOutline,
      matShoppingCartOutline,
      matSettings,
      matExitToApp,
      matHome,
      matShoppingCartCheckout,
      matCheck,
    }),
  ],
  imports: [
    PreviewCardComponent,
    NgIconComponent,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    AllProductsSkeletonComponent,
    CartItemComponent,
    CurrencyPipe,
    RouterLink,
    PreviewSplashComponent,
    ReactiveFormsModule,
  ],
})
export class AllProductsComponent {
  router = inject(Router);
  store = inject(Store<PreviewState>);
  adminStore = inject(Store<AdminState>);
  avatar: string | undefined = getCookie("avatar");
  displayName: string | undefined = getCookie("displayName");
  email = getCookie("email");
  authService = inject(AuthService);
  cartProducts$ = this.store.select(selectUserCartProducts);
  userCart$ = this.store.select(selectUserCart);
  allProducts$ = this.store.select(selectAllProductsWithTags);
  categories$ = this.store.select(selectCategories);
  tags$ = this.store.select(selectTags);
  selectedCategory = new FormControl("All Products");
  lowerBoundPrice = new FormControl("");
  upperBoundPrice = new FormControl("");
  selectedTags$ = this.store.select(selectSelectedTags);
  cart$ = this.store.select(selectCart);
  isLoading$ = this.store.select(selectAllProductsLoading);
  isCheckingout$ = this.store.select(selectIsCheckingoutState);
  conversionData$ = this.store.select(selectCurrencyConversion);
  userCurrency$ = this.store.select(selectCurrency);
  cartTotal$ = this.store.select(selectCartTotal);
  fromHome$ = this.store.select(selectFromHome);
  userCart?: UserCart[];
  conversionData?: Data;
  cartTotal = 0;
  userCurrency = "";
  selectedPriceRangeType = "None";
  priceRangeTypes = ["None", "Equals", "Less Than", "More Than", "Between"];
  cartId = "";
  currency = new FormControl("");

  constructor() {
    this.store.dispatch(getCart({ userId: getCookie("userId") }));
    this.store.dispatch(getAllProducts());
    this.store.dispatch(getCategories());
    this.store.dispatch(getTags());

    this.cart$.pipe(takeUntilDestroyed()).subscribe((cart) => {
      if (cart?.id) this.cartId = cart?.id;
    });

    this.conversionData$.pipe(takeUntilDestroyed()).subscribe((data) => {
      this.conversionData = data;
    });

    this.userCurrency$.pipe(takeUntilDestroyed()).subscribe((userCurrency) => {
      this.userCurrency = userCurrency;
      this.store.dispatch(getCurrencyConversion({ userCurrency }));
    });

    this.userCurrency$
      .pipe(takeUntilDestroyed())
      .subscribe((userCurrency) => this.currency.setValue(userCurrency));

    this.userCart$
      .pipe(takeUntilDestroyed())
      .subscribe((userCart) => (this.userCart = userCart));
  }

  routeToProduct(productToView: CorrelatedProduct) {
    this.store.dispatch(setProductToView({ productToView }));
    this.router.navigate([`/preview-product/${productToView.product.id}`]);
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

  deleteProductFromCart(productId: string) {
    if (this.cartId !== "")
      this.store.dispatch(
        deleteProductFromCart({
          productToDelete: { cartId: this.cartId, productId },
        })
      );
  }

  checkout() {
    if (this.userCart)
      this.store.dispatch(checkoutCart({ userCart: this.userCart }));
  }

  signOut() {
    this.authService.signOut();
  }

  onSelectUserCurrency() {
    this.store.dispatch(
      setCurrency({ userCurrency: this.currency.value ?? "ZAR" })
    );
    this.store.dispatch(
      getCurrencyConversion({ userCurrency: this.currency.value ?? "ZAR" })
    );
  }
}
