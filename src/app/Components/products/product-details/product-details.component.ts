import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  selectedProduct: any;
  id : any;
  constructor(
    public productDeteils : ProductsService,
    public activeRoute : ActivatedRoute
    ) { }
  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.productDeteils.getProductById(this.id).subscribe({
      next: (data) => {
        this.selectedProduct = data;
      },
      error: (err) => {
        console.log(err);
      }
    })

  }
}
