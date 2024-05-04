import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matDelete } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  viewProviders: [provideIcons({ matDelete})],
})
export class CartItemComponent {

}
