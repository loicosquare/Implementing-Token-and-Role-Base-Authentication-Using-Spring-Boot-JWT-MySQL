import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {
  selectedProductIndex = 0;

  constructor(private activatedRoute : ActivatedRoute, private router: Router) { }
  
  product : Product;

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  changeIndex(index){
    this.selectedProductIndex = index;
  }

  buyProduct(){
    this.router.navigate(['buyProduct']);
  }

}
