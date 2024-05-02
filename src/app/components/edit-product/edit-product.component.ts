import { NgIf } from "@angular/common";
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

@Component({
  selector: "app-edit-product",
  standalone: true,
  imports: [NgIconComponent, NgIf],
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
  currency = "ZAR";
  category = "Tech";
  router = inject(Router);
  onImageEdit = false;
  selectedFile?: File;

  onFileSelected(event: any) {
    this.selectedFile = (event?.target as HTMLInputElement)?.files?.[0];
  }
}
