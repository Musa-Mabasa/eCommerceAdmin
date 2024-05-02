import { AsyncPipe, NgIf } from "@angular/common";
import { Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matCheck,
  matClose,
  matEdit,
  matImage,
  matKeyboardArrowDown,
  matPlus,
} from "@ng-icons/material-icons/baseline";
import { CorrelatedProduct, Product } from "../../models/admin";
import { Store } from "@ngrx/store";
import { AdminState } from "../../adminStore/reducer";
import {
  selectCategories,
  selectEditLoadingState,
  selectProductToEdit,
} from "../../adminStore/selectors";
import {
  editProduct,
  getCategories,
  getProductById,
} from "../../adminStore/actions";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { map, takeUntil } from "rxjs";

@Component({
  selector: "app-edit-product",
  standalone: true,
  imports: [NgIconComponent, NgIf, AsyncPipe, ReactiveFormsModule],
  templateUrl: "./edit-product.component.html",
  styleUrl: "./edit-product.component.scss",
  viewProviders: [
    provideIcons({
      matPlus,
      matCheck,
      matKeyboardArrowDown,
      matEdit,
      matImage,
      matClose
    }),
  ],
})
export class EditProductComponent implements OnInit, OnDestroy {
  @Input() correlatedProduct: CorrelatedProduct | undefined;
  @Input() productId?: string;
  router = inject(Router);
  route = inject(ActivatedRoute);
  onImageEdit = false;
  selectedFile?: File;
  store = inject(Store<AdminState>);
  categories$ = this.store.select(selectCategories);
  product$ = this.store.select(selectProductToEdit);
  isEditing$ = this.store.select(selectEditLoadingState);
  editProductForm: FormGroup | undefined;
  product: Product | undefined;

  constructor() {
    const prodSubscription = this.product$.subscribe((prod) => {
      if (!prod) {
        this.router.navigate(["/home/admin-products"]);
      } else {
        this.product = prod;
      }
    });
  }

  ngOnInit(): void {
    this.editProductForm = new FormGroup({
      name: new FormControl(this.product?.name, {
        updateOn: "blur",
      }),
      description: new FormControl(this.product?.description, {
        updateOn: "blur",
      }),
      price: new FormControl(this.product?.price, {
        updateOn: "blur",
      }),
      quantity: new FormControl(this.product?.quantity, {
        updateOn: "blur",
      }),
      currency: new FormControl(this.product?.currency, {
        updateOn: "blur",
      }),
      category: new FormControl(this.product?.category, {
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

  onImageEditRemoved() {
    this.onImageEdit = false;
    this.selectedFile = undefined;
  }

  confirmEdit() {
    if (this.editProductForm?.invalid) {
    }
    console.log(this.editProductForm?.value);

    const { name, description, price, quantity, currency, category } =
      this.editProductForm?.value;

    if (this.product) {
      const product: Product = {
        id: this.product.id,
        adminId: this.product.adminId,
        name,
        description,
        price,
        quantity,
        currency,
        category,
        imageUrl: this.product.imageUrl,
      };

      const file = this.selectedFile;
      const productWithFile = { product, file };

      console.log(productWithFile);

      this.store.dispatch(editProduct({ productWithFile }));
    }
  }

  ngOnDestroy(): void {}
}
