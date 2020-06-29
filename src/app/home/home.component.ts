import { Component } from '@angular/core';
import { storeProducts } from 'src/assets/data.js';

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

  constructor() {}

  ngOnInit() {
    this.products = storeProducts;
    this.filteredProducts = this.products;
  }

  onCartAdd(cartList: any[]) {
    console.log('cart in home', cartList);
    this.cartItems = cartList;
    this.onCartEdit(cartList);
  }

  onCartEdit(editedCart: any[]) {
    console.log('edited Cart', editedCart);
    this.cartItems = editedCart;
    if (editedCart.length === 0) {
      this.filteredProducts.map((product) => {
        product.inCart = false;
        product.count = 0;
        product.total = 0;
      });
    } else {
      let matchID: number, matchItr: number; // only for printing purpose
      for (let i = 0; i < this.filteredProducts.length; i++) {
        let product = this.filteredProducts[i];
        console.log('filteredProducts itr', product.id);
        let matchFlag = false,
          inCart: boolean,
          count: number,
          total: number;
        for (let j = 0; j < editedCart.length; j++) {
          let edit = editedCart[j];
          console.log('editedCart itr', edit.id);
          if (product.id === edit.id) {
            matchID = edit.id;
            matchItr = i;
            console.log('ids match', edit.id);
            matchFlag = true;
            count = edit.count;
            inCart = edit.count === 0 ? false : true;
            total = edit.total;
            break;
          }
        }
        if (matchFlag) {
          product.inCart = inCart;
          product.count = count;
          product.total = total;
          continue;
        } else {
          product.inCart = false;
          product.count = 0;
          product.total = 0;
        }
      }
      // print purpose only
      let temp = this.filteredProducts[matchItr];
      // console.log('updated product', this.filteredProducts);
      console.log(
        'updated product',
        matchID,
        temp.inCart,
        temp.count,
        temp.total
      );
    }
  }

  onCartReset() {
    console.log('Resetting Cart');
    this.cartItems = [];
    this.filteredProducts.map((product) => {
      product.inCart = false;
      product.count = 0;
      product.total = 0;
    });
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
