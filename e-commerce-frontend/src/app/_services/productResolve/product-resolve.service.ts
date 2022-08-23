import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../../../app/_model/product.model';
import { ImagesProcessingService } from '../imagesProcessing/images-processing.service';
import { ProductService } from '../product/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product>{

  constructor(private productService: ProductService, private imageProcessingService: ImagesProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Promise<Product> {
    const id = route.paramMap.get("productId");

    if(id){
      //we w'ill fetch details from backend
      return this.productService.getProductDetailsById(id).
        pipe(
          map(p => this.imageProcessingService.createImages(p))
        );
    }else{
      //returnn emptry product observable
      return of(this.getProductDetails());
    }
  }

  getProductDetails() /*: Product | Observable<Product>*/{
    return {
      productId: null,
      productName: '',
      productDescription: '',
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: [],
    }
  }
}
