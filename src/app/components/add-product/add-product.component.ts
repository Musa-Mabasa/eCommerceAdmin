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
  imgView: HTMLElement | null;
  chooseFile: HTMLInputElement | null;

  constructor() {
    this.imgView = document.getElementById("viewContainer");
    this.chooseFile = document.getElementById("dropzone-file") as HTMLInputElement;
    console.log(this.chooseFile);
    

    if (this.chooseFile) {
      this.chooseFile.addEventListener("change", () => {
        this.getImageData();
      });
    }
  }

  getImageData() {
    if (!this.chooseFile) console.error("Element Error");

    const files = this.chooseFile?.files?.[0];
    console.log(files);
    
    if (files) {
      const fileReader = new FileReader();
      const result = fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", () => {
        if (this.imgView)
          this.imgView.innerHTML = '<img src="' + result + '" />';
      });
    }
  }
}
