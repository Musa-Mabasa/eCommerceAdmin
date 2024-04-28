import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
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
  currency = "ZAR";
  category = "Tech";
  router = inject(Router);
  onImageEdit = false;
  selectedFile?: {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    lastModifiedDate: Date;
  };

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
}
