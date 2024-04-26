import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matCheck } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
  viewProviders: [provideIcons({ matCheck })],
})
export class EditProductComponent {

}
