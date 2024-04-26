import { NgIf } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {
  matCheck,
  matEdit,
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
    provideIcons({ matPlus, matCheck, matKeyboardArrowDown, matEdit }),
  ],
})
export class EditProductComponent {
  currency = "ZAR";
  category = "Tech";
  router = inject(Router);
}
