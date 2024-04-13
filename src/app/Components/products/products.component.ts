import { ProductsService } from 'src/app/Services/products.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: any = [];
  constructor(public allProducts: ProductsService) { }
  ngOnInit(): void {
    this.products = this.allProducts.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  deleteProductHandle(id: any) {
    this.allProducts.deleteProduct(id).subscribe({
      next: (data) => {
        this.products = this.products.filter((product: any) => product.id !== id);
      }
    })
  }
}