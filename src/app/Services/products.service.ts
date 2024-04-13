import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl : string = "http://localhost:3000/products";
  constructor(public http: HttpClient) { }
  getAllProducts() {
    return this.http.get(this.baseUrl);
  }

  getProductById(id: any) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addNewProduct(product: any) {
    return this.http.post(this.baseUrl, product);
  }

  editProduct(id: any, product: any) {
    return this.http.put(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
