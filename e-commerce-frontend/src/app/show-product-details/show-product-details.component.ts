import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { Product } from '../_model/product.model';
import { ImagesProcessingService } from '../_services/imagesProcessing/images-processing.service';
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
    'Images',
    'Edit',
    'Delete'
  ];

  productDetails: Product[] = [];

  constructor(
    private productService: ProductService,
    private imagesDialog: MatDialog,
    private imagesProcessingService: ImagesProcessingService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts()
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imagesProcessingService.createImages(product)))
    )
    .subscribe({
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

  showImages(product: Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages
      },
      height: '500px',
      width: '800px'
    });
  }
}
