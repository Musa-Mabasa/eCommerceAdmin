import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { doc } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { NgIcon, NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matPlus,
  matCheck,
  matKeyboardArrowDown,
  matEdit,
  matImage,
  matClose,
} from "@ng-icons/material-icons/baseline";

@Component({
  selector: "app-add-product",
  standalone: true,
  imports: [NgIconComponent, NgIf],
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
  currency = "ZAR";
  category = "Tech";
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
