import { AsyncPipe, NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
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
import { Category, Product } from "../../models/admin";
import { getCookie } from "../../utils/utils";
import { AdminState } from "../../adminStore/reducer";
import { Store } from "@ngrx/store";
import { addProduct, getCategories } from "../../adminStore/actions";
import {
  selectAddLoadingState,
  selectCategories,
} from "../../adminStore/selectors";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-add-product",
  standalone: true,
  imports: [NgIconComponent, NgIf, ReactiveFormsModule, AsyncPipe],
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
  isAdding$ = this.store.select(selectAddLoadingState);
  categories$ = this.store.select(selectCategories);
  categories?: Category[];

  constructor() {
    this.store.dispatch(getCategories());

    this.categories$
      .pipe(takeUntilDestroyed())
      .subscribe((categories) => (this.categories = categories));
  }

  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      name: new FormControl("", {
        updateOn: "submit",
        validators: [Validators.required],
      }),
      description: new FormControl("", {
        updateOn: "submit",
        validators: [Validators.required],
      }),
      price: new FormControl("", {
        updateOn: "submit",
        validators: [Validators.required],
      }),
      quantity: new FormControl("", {
        updateOn: "submit",
        validators: [Validators.required],
      }),
      currency: new FormControl("Select a currency", {
        updateOn: "submit",
        validators: [Validators.required],
      }),
      category: new FormControl("Select a category", {
        updateOn: "submit",
        validators: [Validators.required],
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
      return;
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
    const file = this.selectedFile;
    const productWithFile = { product, file };

    this.store.dispatch(addProduct({ productWithFile }));
  }
}
