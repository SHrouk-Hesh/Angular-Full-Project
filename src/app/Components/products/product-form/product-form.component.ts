import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {


  productId: any;
  productForm = new FormGroup({
    productName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    price: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, Validators.required),
  });

  constructor(public productServices: ProductsService, public activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];

      if (this.productId == 0) {
        this.getProductName.setValue('');
        this.getPrice.setValue(null);
        this.getQuantity.setValue(null);
      }
      else {
        this.productServices.getProductById(this.productId).subscribe({
          next: (data: any) => {
            this.getProductName.setValue(data.productName);
            this.getPrice.setValue(data.price);
            this.getQuantity.setValue(data.quantity);
          }
        });
      }
    }
    )
  }
  get getProductName() {
    return this.productForm.controls['productName'];
  }
  get getPrice() {
    return this.productForm.controls['price'];
  }
  get getQuantity() {
    return this.productForm.controls['quantity'];
  }

  productHandler(data: any) {
    data.preventDefault();
    if (this.productId == 0) {
      this.productServices.addNewProduct(this.productForm.value).subscribe({
        next: (data) => {
          this.router.navigate(['/products']);
        }
      });
    }
    else {
      this.productServices.editProduct(this.productId, this.productForm.value).subscribe({
        next: (data) => {
          this.router.navigate(['/products']);
        }
      });
    }
  };
}
