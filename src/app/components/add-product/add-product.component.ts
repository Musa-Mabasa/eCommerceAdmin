import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
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
  selectedFile?: File;

  //I need confimation for
  onFileSelected(event: Event) {
    this.selectedFile = (event?.target as HTMLInputElement)?.files?.[0];
  }
}
