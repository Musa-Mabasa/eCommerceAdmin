import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matPlus,
  matCheck,
  matKeyboardArrowDown,
  matEdit,
  matImage,
  matClose,
} from "@ng-icons/material-icons/baseline";
import { Product } from "../../models/admin";
import { getCookie } from "../../utils/utils";
import { AdminState } from "../../adminStore/reducer";
import { Store } from "@ngrx/store";
import { addProduct } from "../../adminStore/actions";

@Component({
  selector: "app-add-product",
  standalone: true,
  imports: [NgIconComponent, NgIf, ReactiveFormsModule],
  templateUrl: "./add-product.component.html",
  styleUrl: "./add-product.component.scss",
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
export class AddProductComponent {
  router = inject(Router);
  store = inject(Store<AdminState>);
  selectedFile?: File;
  addProductForm: FormGroup | undefined;

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
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
      category: new FormControl("Tech", {
        updateOn: "blur",
      }),
    });
  }

  get name() {
    return this.addProductForm?.get("name");
  }
  get description() {
    return this.addProductForm?.get("description");
  }
  get price() {
    return this.addProductForm?.get("price");
  }
  get quantity() {
    return this.addProductForm?.get("quantity");
  }
  get currency() {
    return this.addProductForm?.get("currency");
  }
  get category() {
    return this.addProductForm?.get("category");
  }

  onFileSelected(event: Event) {
    this.selectedFile = (event?.target as HTMLInputElement)?.files?.[0];
  }

  onConfirm() {
    if (this.addProductForm?.invalid) {
    }

    const { name, description, price, quantity, currency, category } =
      this.addProductForm?.value;

    const adminId = getCookie("userId");

    const product: Product = {
      adminId,
      name,
      description,
      price,
      quantity,
      currency,
      category,
    };

    this.store.dispatch(addProduct({ product }));
  }
}
