import { Injectable, OnInit } from '@angular/core';

import { product } from '../models/product.model';
import { storeProducts } from 'src/assets/data';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  products: product[] = storeProducts;

  constructor() {}

  ngOnInit() {}

  updateProductStatus(productID: number, flag: boolean) {
    this.products.map((product) => {
      if (product.id === productID) {
        product.inCart = flag;
      }
    });
  }

  resetAll(flag: boolean) {
    this.products.map((product) => {
      product.inCart = flag;
    });
  }
}
