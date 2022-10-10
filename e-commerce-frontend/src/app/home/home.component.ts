import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Product } from '../_model/product.model';
import { ImagesProcessingService } from '../_services/imagesProcessing/images-processing.service';
import { ProductService } from '../_services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productDetails = [];

  constructor(private productService : ProductService, private imagesProcessingService : ImagesProcessingService, private router : Router) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imagesProcessingService.createImages(product)))
    )
    .subscribe({
      next: (resp: Product[]) => {
        (this.productDetails = resp),
        console.log(this.productDetails)
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  shoProductDetails(productId){
    this.router.navigate(['/productViewDetails', {productId: productId}])
  }

}
