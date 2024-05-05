import { Component, inject } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matShoppingCartOutline } from "@ng-icons/material-icons/outline";
import { Store } from "@ngrx/store";
import { PreviewState } from "../../previewStore/reducer";
import { selectCart, selectProductToView } from "../../previewStore/selectors";
import { AsyncPipe } from "@angular/common";
import { CorrelatedProduct } from "../../models/admin";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { addProductToCart } from "../../previewStore/actions";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-preview-product",
  standalone: true,
  imports: [NgIconComponent, AsyncPipe, RouterLink],
  templateUrl: "./preview-product.component.html",
  styleUrl: "./preview-product.component.scss",
  viewProviders: [
    provideIcons({
      matShoppingCartOutline,
    }),
  ],
})
export class PreviewProductComponent {
  store = inject(Store<PreviewState>);
  router = inject(Router);
  product$ = this.store.select(selectProductToView);
  cart$ = this.store.select(selectCart);
  product?: CorrelatedProduct;
  cartId = "";
  images = [
    "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];

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
}
