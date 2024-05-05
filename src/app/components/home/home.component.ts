import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matSegment,
  matAdminPanelSettings,
  matShoppingBag,
  matSettings,
  matExitToApp,
  matCheck,
} from "@ng-icons/material-icons/baseline";
import { getCookie } from "../../utils/utils";
import { AsyncPipe, NgIf } from "@angular/common";
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
  selectCurrency,
  selectUserCartProducts,
} from "../../previewStore/selectors";
import {
  deleteProductFromCart,
  getCart,
  getCurrencyConversion,
  setCurrency,
} from "../../previewStore/actions";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

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
  ],
})
export class HomeComponent {
  [x: string]: any;
  avatar: string | undefined = getCookie("avatar");
  displayName: string | undefined = getCookie("displayName");
  email = getCookie("email");
  authService = inject(AuthService);
  store = inject(Store<PreviewState>);
  cart$ = this.store.select(selectCart);
  cartProducts$ = this.store.select(selectUserCartProducts);
  userCurrency$ = this.store.select(selectCurrency);
  cartId = "";
  cartTotal = 0;
  currency = new FormControl("");

  constructor() {
    this.store.dispatch(getCart({ userId: getCookie("userId") }));
    this.userCurrency$
      .pipe(takeUntilDestroyed())
      .subscribe((userCurrency) =>
        this.store.dispatch(getCurrencyConversion({ userCurrency }))
      );
    this.cart$.pipe(takeUntilDestroyed()).subscribe((cart) => {
      if (cart?.id) {
        this.cartId = cart?.id;
      }
    });

    this.cartProducts$.pipe(takeUntilDestroyed()).subscribe((products) => {
      this.cartTotal = 0;
      for (const product of products) {
        this.cartTotal += product.price;
      }
    });

    this.userCurrency$
      .pipe(takeUntilDestroyed())
      .subscribe((userCurrency) => this.currency.setValue(userCurrency));
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
}
