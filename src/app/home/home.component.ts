import { Component } from '@angular/core';
import { storeProducts } from 'src/assets/data.js';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  value: string;
  isEmpty: boolean = false;
  cartItems: any[] = [];
  cartSub: Subscription;

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.products = this.productsService.products;
    this.filteredProducts = this.products;
  }

  onBrandFilter(filters: any) {
    // this.filterStack = filters;
    console.log('Updated filters', filters);
    if (filters.brands.length === 0 && filters.priceRanges.length === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = [];
    }

    this.products.forEach((product) => {
      let brandFilters = filters.brands;
      brandFilters.forEach((brand) => {
        if (product.company.toLowerCase() === brand.toLowerCase()) {
          this.filteredProducts.push(product);
        }
      });
    });

    console.log('before filtering prices', this.filteredProducts);

    if (this.filteredProducts.length === 0) {
      this.filteredProducts = this.products;
    }

    let tempProducts = [];
    this.filteredProducts.forEach((product) => {
      let priceFilters = filters.priceRanges;
      priceFilters.forEach((price) => {
        let limits = price.split('-');
        if (limits.length === 1 && limits[0].indexOf('+') > 0) {
          let low: string = limits[0].trim().substr(1, limits[0].length - 2);
          if (product.price >= +low) {
            tempProducts.push(product);
          } else if (tempProducts.length === 0) {
            this.filteredProducts = [];
          }
        } else {
          let low: number = +price.split('-')[0].trim().substr(1);
          let high: number = +price.split('-')[1].trim().substr(1);
          if (product.price >= low && product.price <= high) {
            tempProducts.push(product);
          } else if (tempProducts.length === 0) {
            this.filteredProducts = [];
          }
        }
      });
    });

    if (tempProducts.length !== 0) {
      this.filteredProducts = tempProducts;
    }

    if (this.filteredProducts.length === 0) {
      this.isEmpty = true;
    } else {
      this.isEmpty = false;
    }
  }

  searchProducts(event: any) {
    let tempProducts = storeProducts;
    // let tempProducts = this.filteredProducts;
    this.value = event.target.value;
    tempProducts = tempProducts.filter((product) => {
      return product.title.toLowerCase().indexOf(this.value.toLowerCase()) >= 0
        ? true
        : false;
    });
    // console.log(this.value, tempProducts);
    this.isEmpty = tempProducts.length === 0 ? true : false;
    // this.products = tempProducts;
    this.filteredProducts = tempProducts;
  }
}
