import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../../../app/_helper/helper';
import { Product } from '../../../app/_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient) {}

  public addProduct(product: FormData){
    return this.httpClient.post<Product>(`${baseUrl}/addNewProduct`, product);
  }
}
