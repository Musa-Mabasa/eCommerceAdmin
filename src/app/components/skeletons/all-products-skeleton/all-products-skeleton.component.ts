import { Component } from '@angular/core';
import { ProductCardSkeletonComponent } from "../product-card-skeleton/product-card-skeleton.component";

@Component({
    selector: 'app-all-products-skeleton',
    standalone: true,
    templateUrl: './all-products-skeleton.component.html',
    styleUrl: './all-products-skeleton.component.scss',
    imports: [ProductCardSkeletonComponent]
})
export class AllProductsSkeletonComponent {

}
