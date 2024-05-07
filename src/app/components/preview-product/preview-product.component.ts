import { Component, inject } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matShoppingCartOutline } from "@ng-icons/material-icons/outline";
import { Store } from "@ngrx/store";
import { PreviewState } from "../../previewStore/reducer";
import {
  selectCart,
  selectCurrency,
  selectCurrencyConversion,
  selectProductToView,
  selectRelatedProducts,
} from "../../previewStore/selectors";
import { AsyncPipe, CurrencyPipe, NgIf } from "@angular/common";
import { CorrelatedProduct } from "../../models/admin";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { addProductToCart, setProductToView } from "../../previewStore/actions";
import { Router, RouterLink } from "@angular/router";
import { CurrencyConversionPipe } from "../../pipes/currency-conversion.pipe";

@Component({
    selector: "app-preview-product",
    standalone: true,
    templateUrl: "./preview-product.component.html",
    styleUrl: "./preview-product.component.scss",
    viewProviders: [
        provideIcons({
            matShoppingCartOutline,
        }),
    ],
    imports: [NgIconComponent, AsyncPipe, RouterLink, CurrencyPipe, NgIf, CurrencyConversionPipe]
})
export class PreviewProductComponent {
  store = inject(Store<PreviewState>);
  router = inject(Router);
  product$ = this.store.select(selectProductToView);
  cart$ = this.store.select(selectCart);
  relatedProducts$ = this.store.select(selectRelatedProducts);
  product?: CorrelatedProduct;
  cartId = "";
  conversionData$ = this.store.select(selectCurrencyConversion);
  userCurrency$ = this.store.select(selectCurrency);

  constructor() {
    this.cart$.pipe(takeUntilDestroyed()).subscribe((cart) => {
      if (cart) this.cartId = cart?.id;
    });

    this.product$.pipe(takeUntilDestroyed()).subscribe((product) => {
      if (product) this.product = product;
      else this.router.navigate([`home/all-products`]);
    });
  }

  addProductToCart() {
    if (this.cartId && this.product) {
      this.store.dispatch(
        addProductToCart({
          productToAdd: { cartId: this.cartId, product: this.product },
        })
      );

      this.router.navigate([`home/all-products`]);
    }
  }

  routeToRelatedProduct(productToView: CorrelatedProduct) {
    this.store.dispatch(setProductToView({ productToView }));
    this.router.navigate([`/home/preview-product/${productToView.product.id}`]);
  }
}
