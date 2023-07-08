import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductsService} from "../../core/services/product.service";
import {Product} from "../../core/interfaces/product.interface";

@Component({
  selector: 'gac-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

    private productAService = inject(ProductsService);
    products: Product[] = [];
    ngOnInit() {
        this.getProducts();
    }

    getProducts() {
        this.productAService.getAllSingle().subscribe({
            next: (products) => {
                this.products = products
                console.log(products)
            }
        })
    }
}
