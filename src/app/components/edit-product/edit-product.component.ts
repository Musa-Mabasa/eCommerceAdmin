import { AsyncPipe, NgIf } from "@angular/common";
import { Component, Input, inject } from "@angular/core";
import { Router } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matCheck,
  matClose,
  matEdit,
  matImage,
  matKeyboardArrowDown,
  matPlus,
} from "@ng-icons/material-icons/baseline";
import { CorrelatedProduct } from "../../models/admin";
import { Store } from "@ngrx/store";
import { AdminState } from "../../adminStore/reducer";
import {
  selectCategories,
  selectProductToEdit,
} from "../../adminStore/selectors";
import { getCategories, getProductById } from "../../adminStore/actions";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-edit-product",
  standalone: true,
  imports: [NgIconComponent, NgIf, AsyncPipe],
  templateUrl: "./edit-product.component.html",
  styleUrl: "./edit-product.component.scss",
  viewProviders: [
    provideIcons({
      matPlus,
      matCheck,
      matKeyboardArrowDown,
      matEdit,
      matImage,
      matClose,
    }),
  ],
})
export class EditProductComponent {
  @Input() correlatedProduct: CorrelatedProduct | undefined;
  @Input() productId?: string;
  router = inject(Router);
  onImageEdit = false;
  selectedFile?: File;
  store = inject(Store<AdminState>);
  categories$ = this.store.select(selectCategories);
  product$ = this.store.select(selectProductToEdit);
  editProductForm: FormGroup | undefined;

  constructor() {
    this.store.dispatch(getCategories());
    if (!this.product$ && this.productId) {
      this.store.dispatch(getProductById({ productId: this.productId }));
    }
  }

  ngOnInit(): void {
    this.editProductForm = new FormGroup({
      name: new FormControl("", {
        updateOn: "blur",
      }),
      description: new FormControl("", {
        updateOn: "blur",
      }),
      price: new FormControl("0", {
        updateOn: "blur",
      }),
      quantity: new FormControl("0", {
        updateOn: "blur",
      }),
      currency: new FormControl("ZAR", {
        updateOn: "blur",
      }),
      category: new FormControl("", {
        updateOn: "change",
      }),
    });
  }

  get name() {
    return this.editProductForm?.get("name");
  }
  get description() {
    return this.editProductForm?.get("description");
  }
  get price() {
    return this.editProductForm?.get("price");
  }
  get quantity() {
    return this.editProductForm?.get("quantity");
  }
  get currency() {
    return this.editProductForm?.get("currency");
  }
  get category() {
    return this.editProductForm?.get("category");
  }

  onFileSelected(event: any) {
    this.selectedFile = (event?.target as HTMLInputElement)?.files?.[0];
  }
}
