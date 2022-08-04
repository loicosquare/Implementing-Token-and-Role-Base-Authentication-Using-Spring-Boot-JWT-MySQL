import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product/product.service';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'Id',
    'Product Name',
    'Product Description',
    'Product Discounted Price',
    'Product Actual Price',
    'Edit',
    'Delete'
  ];

  productDetails: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (resp: Product[]) => (this.productDetails = resp),
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  public deleteProductDetails(productId){
    this.productService.deleteProductDetails(productId).subscribe({
      next: (resp) => this.getAllProducts(), 
      error: (err : HttpErrorResponse) => console.log(err)
    })
  }
}
