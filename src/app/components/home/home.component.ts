import { Component, inject } from "@angular/core";
import {
  Data,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matSegment,
  matAdminPanelSettings,
  matShoppingBag,
  matSettings,
  matExitToApp,
  matCheck,
  matShoppingCartCheckout,
} from "@ng-icons/material-icons/baseline";
import { getCookie } from "../../utils/utils";
import { AsyncPipe, CurrencyPipe, NgIf } from "@angular/common";
import { AuthService } from "../../services/auth.service";
import {
  matNotificationsNoneOutline,
  matShoppingCartOutline,
} from "@ng-icons/material-icons/outline";
import { CartItemComponent } from "../cart-item/cart-item.component";
import { Store } from "@ngrx/store";
import { PreviewState } from "../../previewStore/reducer";
import {
  selectCart,
  selectCartTotal,
  selectCurrency,
  selectCurrencyConversion,
  selectIsCheckingoutState,
  selectUserCart,
  selectUserCartProducts,
} from "../../previewStore/selectors";
import {
  checkoutCart,
  deleteProductFromCart,
  getCart,
  getCurrencyConversion,
  setCurrency,
} from "../../previewStore/actions";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { UserCart } from "../../models/admin";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  viewProviders: [
    provideIcons({
      matSegment,
      matAdminPanelSettings,
      matShoppingBag,
      matSettings,
      matExitToApp,
      matNotificationsNoneOutline,
      matShoppingCartOutline,
      matCheck,
      matShoppingCartCheckout,
    }),
  ],
  imports: [
    NgIconComponent,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    NgIf,
    CartItemComponent,
    AsyncPipe,
    ReactiveFormsModule,
    CurrencyPipe,
  ],
})
export class HomeComponent {
  avatar: string | undefined = getCookie("avatar");
  displayName: string | undefined = getCookie("displayName");
  email = getCookie("email");
  authService = inject(AuthService);
  store = inject(Store<PreviewState>);
  cart$ = this.store.select(selectCart);
  cartProducts$ = this.store.select(selectUserCartProducts);
  userCart$ = this.store.select(selectUserCart);
  conversionData$ = this.store.select(selectCurrencyConversion);
  userCurrency$ = this.store.select(selectCurrency);
  cartTotal$ = this.store.select(selectCartTotal);
  isCheckingout$ = this.store.select(selectIsCheckingoutState);
  userCart?: UserCart[];
  userCurrency = "";
  cartId = "";
  cartTotal = 0;
  conversionData?: Data;
  currency = new FormControl("");

  constructor() {
    this.store.dispatch(getCart({ userId: getCookie("userId") }));
    this.userCurrency$.pipe(takeUntilDestroyed()).subscribe((userCurrency) => {
      this.userCurrency = userCurrency;
      this.store.dispatch(getCurrencyConversion({ userCurrency }));
    });
    this.cart$.pipe(takeUntilDestroyed()).subscribe((cart) => {
      if (cart?.id) {
        this.cartId = cart?.id;
      }
    });

    this.conversionData$
      .pipe(takeUntilDestroyed())
      .subscribe((conversionData) => {
        this.conversionData = conversionData;
      });

    this.userCurrency$
      .pipe(takeUntilDestroyed())
      .subscribe((userCurrency) => this.currency.setValue(userCurrency));

    this.userCart$
      .pipe(takeUntilDestroyed())
      .subscribe((userCart) => (this.userCart = userCart));
  }

  getPrice(baseValue: number, conversionRate: number | undefined) {
    if (baseValue && conversionRate)
      return Number((baseValue / conversionRate).toFixed(2));
    else return baseValue;
  }

  deleteProductFromCart(productId: string) {
    if (this.cartId !== "")
      this.store.dispatch(
        deleteProductFromCart({
          productToDelete: { cartId: this.cartId, productId },
        })
      );
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

  checkout() {
    if (this.userCart)
      this.store.dispatch(checkoutCart({ userCart: this.userCart }));
  }
}
