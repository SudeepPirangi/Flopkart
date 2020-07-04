import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { CartService } from 'src/app/services/cart.service';
import { product } from 'src/app/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: product[];
  cartEmpty: boolean;
  grandTotal: number;
  cartSub: Subscription;

  constructor(private cartService: CartService) {
    this.cartItems = [];
    this.cartEmpty = true;
    this.grandTotal = 0;
  }

  ngOnInit(): void {
    this.cartService.cartSubject.subscribe((cart: product[]) => {
      this.cartItems = cart;
      this.cartEmpty = this.cartItems.length === 0 ? true : false;
      // console.log('subj', this.cartItems);
    });
    this.cartService.cartTotalSubject.subscribe((total: number) => {
      this.grandTotal = total;
    });
  }

  onQtyMinus(minusID: number) {
    this.cartService.updateQuantity(minusID, 'minus');
  }

  onQtyPlus(plusID: number) {
    this.cartService.updateQuantity(plusID, 'plus');
  }

  clearCart() {
    this.cartService.clearCart();
  }

  makePayment() {
    alert(
      'HA HA HA... Look at your face! \nYou cannot afford these products \nTry something else'
    );
    this.clearCart();
  }
}
