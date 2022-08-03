import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent implements OnInit {

  product: Product = {
    productName: '',
    productDescription: '',
    productDiscountedPrice: 0,
    productActualPrice: 0,
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  public addProduct(productForm: NgForm) {
    this.productService.addProduct(this.product).subscribe({
      next: (response: Product) => {
        productForm.reset();
      },
      error: (err : HttpErrorResponse)=>console.log(err)
    })
  }
}
