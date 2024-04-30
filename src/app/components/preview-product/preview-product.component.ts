import { Component } from "@angular/core";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import { matShoppingCartOutline } from "@ng-icons/material-icons/outline";

@Component({
  selector: "app-preview-product",
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: "./preview-product.component.html",
  styleUrl: "./preview-product.component.scss",
  viewProviders: [
    provideIcons({
      matShoppingCartOutline,
    }),
  ],
})
export class PreviewProductComponent {
  images = [
    "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
}
