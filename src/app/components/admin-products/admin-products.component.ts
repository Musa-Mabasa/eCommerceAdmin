import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matPlus, matSort } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss',
  viewProviders: [
    provideIcons({ matPlus, matSort}),
  ],
})
export class AdminProductsComponent {
  tags = ["All products","Shoes", "Sport", "Kitchen", "Technology", "Gaming", "Clothes"]
  currentTag = 'All products'

}
