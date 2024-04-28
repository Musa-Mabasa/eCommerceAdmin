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
} from "@ng-icons/material-icons/baseline";

@Component({
  selector: "app-add-product",
  standalone: true,
  imports: [NgIconComponent, NgIf],
  templateUrl: "./add-product.component.html",
  styleUrl: "./add-product.component.scss",
  viewProviders: [
    provideIcons({ matPlus, matCheck, matKeyboardArrowDown, matEdit }),
  ],
})
export class AddProductComponent {
  router = inject(Router);
  currency = "ZAR";
  category = "Tech";
}
