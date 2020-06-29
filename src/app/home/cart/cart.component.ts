import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnChanges {
  @Input() cartItems: any[];
  @Output() editedCart = new EventEmitter<any[]>();
  @Output() resetCart = new EventEmitter<void>();
  cartEmpty: boolean;
  grandTotal: number;
  disableMinus: boolean;
  disablePlus: boolean;

  constructor() {
    this.cartEmpty = true;
    this.grandTotal = 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('cart changes', changes);
    if ('cartItems' in changes) {
      this.updateCart(changes.cartItems.currentValue);
    }
  }

  ngOnInit(): void {
    // this.cartEmpty = this.cartItems.length > 0;
    console.log(
      'cart init - received cart',
      this.cartItems,
      this.cartItems.length
    );
  }

  updateCart(updatedCart: any[]) {
    console.log('updated cart', updatedCart);
    this.cartItems = updatedCart;
    if (this.cartItems.length > 0) {
      this.cartEmpty = false;
    } else {
      this.cartEmpty = true;
    }
    this.cartItems.forEach((item) => {
      this.grandTotal += item.total;
      console.log(this.grandTotal);
    });
    // this.editedCart.emit(this.cartItems);
  }

  onQtyMinus(minusID: number) {
    this.cartItems.map((item: any) => {
      if (item.id === minusID) {
        this.disableMinus = item.count === 1 ? true : false;
        this.disablePlus = item.count <= 5 ? false : true;
        --item.count;
        item.total -= item.price;
        this.grandTotal -= item.price;
      }
    });
    this.editedCart.emit(this.cartItems);
  }

  onQtyPlus(plusID: number) {
    this.cartItems.map((item: any) => {
      if (item.id === plusID) {
        this.disablePlus = item.count === 4 ? true : false;
        this.disableMinus = item.count >= 0 ? false : true;
        ++item.count;
        item.total += item.price;
        this.grandTotal += item.price;
      }
    });
    this.editedCart.emit(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
  }

  makePayment() {
    alert(
      'HA HA HA... Look at your face! \nYou cannot afford these products \nTry something else'
    );
    this.clearCart();
  }
}
