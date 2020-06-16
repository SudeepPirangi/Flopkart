import { Component } from '@angular/core';
import { storeProducts } from 'src/assets/data.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products: any[];
  filterStack: any[];

  constructor() {
    this.products = storeProducts;
    this.filterStack = [];
  }

  onBrandFilter(filterObj: any) {
    if (filterObj.isChecked) {
      this.filterStack.push({
        type: filterObj.filterType,
        param: filterObj.param,
      });
    } else {
      this.filterStack = this.filterStack.filter((eachObj) => {
        return eachObj.param !== filterObj.param;
      });
    }
    this.filterAllProducts();
  }

  filterAllProducts() {
    let tempProducts = storeProducts;
    this.filterStack.forEach((eachFilter) => {
      if (eachFilter.type === 'brand') {
        tempProducts = tempProducts.filter((product: any) => {
          return (
            product.company.toLowerCase() === eachFilter.param.toLowerCase()
          );
        });
      } else if (eachFilter.type === 'priceRange') {
        let low: number = +eachFilter.param.split('-')[0].trim().substr(1);
        let high: number = +eachFilter.param.split('-')[1].trim().substr(1);
        tempProducts = tempProducts.filter((product: any) => {
          return product.price >= low && product.price <= high;
        });
      }
    });
    this.products = tempProducts;
  }
}
