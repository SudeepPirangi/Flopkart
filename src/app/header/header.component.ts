import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  cart: any[] = [];
  cartSub: Subscription;
  badge: number = 0;
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartSub = this.cartService.cartSubject.subscribe((cart: any[]) => {
      this.cart = cart;
      this.badge = cart.length;
      // this.cartEmpty = this.cartItems.length === 0 ? true : false;
      // console.log('length', this.cart.length);
    });
  }
}
