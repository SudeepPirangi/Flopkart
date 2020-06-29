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
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input() filteredProducts: any;
  @Output() cartList = new EventEmitter<any[]>();
  cartItems: any[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('product changes', changes);
    if ('filteredProducts' in changes) {
      this.filteredProducts = changes.filteredProducts.currentValue;
    }
  }

  ngOnInit(): void {}

  addToCart(product: any) {
    this.setProductCartStatus(product);

    // console.log('product added', product);
    if (this.cartItems.length === 0) {
      ++product.count;
      product.total = product.price;
      this.cartItems.push(product);
      console.log('inital pushed', product.title);
    } else {
      let flag = false;
      this.cartItems.map((thisItem: any) => {
        if (thisItem.id === product.id) {
          console.log('item exists', product.title);
          flag = true;
          ++thisItem.count;
          thisItem.total = thisItem.count * thisItem.price;
        }
      });
      if (!flag) {
        ++product.count;
        product.total = product.price;
        this.cartItems.push(product);
        console.log('just pushed', product.title);
      }
    }
    this.cartList.emit(this.cartItems);
  }

  setProductCartStatus(product: any) {
    this.filteredProducts.map((origProduct) => {
      if (origProduct.id === product.id) {
        origProduct.inCart = true;
      }
    });
  }
}
