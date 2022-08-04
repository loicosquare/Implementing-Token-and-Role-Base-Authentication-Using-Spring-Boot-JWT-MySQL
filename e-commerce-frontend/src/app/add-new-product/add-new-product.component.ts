import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';
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
    productImages: [],
  };

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  public addProduct(productForm: NgForm) {
    const productFormData = this.prepareFormData(this.product);

    this.productService.addProduct(productFormData).subscribe({
      next: (response: Product) => {
        productForm.reset();
        this.product.productImages = [];
      },
      error: (err: HttpErrorResponse) => console.log(err),
    });
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product' /*Qui vient du backend*/,
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (var i = 0; i < product.productImages.length; i++) {
      formData.append(
        'image',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;
  }

  public onFileSelected(event) {
    if (event.target.files[0]) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };

      this.product.productImages.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.product.productImages.splice(i, 1);
  }

  fileDropped(fileHandle : FileHandle){
    this.product.productImages.push(fileHandle);
  }
}
