import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input() filteredProducts: any;
  cartItems: any[] = [];

  constructor(
    private cartservice: CartService,
    private productsService: ProductsService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('product changes', changes);
    if ('filteredProducts' in changes) {
      this.filteredProducts = changes.filteredProducts.currentValue;
    }
  }

  ngOnInit(): void {}

  addToCart(product: product) {
    this.cartservice.addToCart(product);
    this.updateProductStatus(product.id, true);
  }

  updateProductStatus(id: number, status: boolean) {
    this.productsService.updateProductStatus(id, status);
  }
}
