import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { ProductsService } from './products.service';
import { product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  cartSubject = new Subject();
  cartTotalSubject = new Subject();

  modifiedCart: any[] = [];
  cartTotal: number = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {}

  addToCart(product: product) {
    console.log('adding', product.title);
    if (this.modifiedCart.length === 0) {
      this.modifiedCart.push({
        ...product,
        inCart: true,
        count: 1,
        total: product.price,
        disableMinus: false,
        disablePlus: false,
      });
      console.log('inital pushed', product.title);
    } else {
      let flag = false;
      this.modifiedCart.map((thisItem: any) => {
        if (thisItem.id === product.id) {
          console.log('item exists', product.title);
          flag = true;
          ++thisItem.count;
          thisItem.total = thisItem.count * thisItem.price;
          this.cartTotal += thisItem.price;
        }
      });
      if (!flag) {
        this.modifiedCart.push({
          ...product,
          inCart: true,
          count: 1,
          total: product.price,
          disableMinus: false,
          disablePlus: false,
        });
        console.log('just pushed', product.title);
      }
    }
    this.cartTotal += product.price;
    this.cartSubject.next(this.modifiedCart);
    this.cartTotalSubject.next(this.cartTotal);
    console.log(this.modifiedCart, this.cartTotal);
  }

  updateQuantity(productID: number, type: string) {
    let flag = false;
    this.modifiedCart.map((product: any) => {
      if (product.id === productID) {
        if (type === 'plus') {
          product.disablePlus = product.count === 4 ? true : false;
          // product.disableMinus = product.count >= 0 ? false : true;
          product.count = ++product.count;
          product.total += product.price;
          this.cartTotal += product.price;
        } else if (type === 'minus') {
          // product.disableMinus = product.count === 1 ? true : false;
          product.disablePlus = product.count <= 5 ? false : true;
          product.count = --product.count;
          flag = product.count === 0;
          product.total -= product.price;
          this.cartTotal -= product.price;
        }
      }
    });
    if (flag) {
      this.modifiedCart = this.modifiedCart.filter((product) => {
        return product.id !== productID;
      });
      this.productsService.updateProductStatus(productID, false);
    }
    this.cartSubject.next(this.modifiedCart);
    this.cartTotalSubject.next(this.cartTotal);
  }

  clearCart() {
    this.modifiedCart = [];
    this.cartTotal = 0;
    this.cartSubject.next(this.modifiedCart);
    this.cartTotalSubject.next(this.cartTotal);
    this.productsService.resetAll(false);
  }
}
