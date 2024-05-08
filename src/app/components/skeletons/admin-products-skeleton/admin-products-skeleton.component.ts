import { Component } from '@angular/core';
import { ProductCardSkeletonComponent } from "../product-card-skeleton/product-card-skeleton.component";

@Component({
    selector: 'app-admin-products-skeleton',
    standalone: true,
    templateUrl: './admin-products-skeleton.component.html',
    styleUrl: './admin-products-skeleton.component.scss',
    imports: [ProductCardSkeletonComponent]
})
export class AdminProductsSkeletonComponent {

}
