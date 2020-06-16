import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { storeProducts } from '../../../assets/data.js';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.css'],
})
export class SideDrawerComponent implements OnInit {
  hideDrawer: boolean = true;
  allProducts: any = storeProducts;
  allBrands: string[] = ['None'];
  allPrices: string[] = ['None'];
  priceRanges: string[] = ['$0 - $100', '$101 - $500', '$501 - $1000'];

  @Output() filterChange = new EventEmitter<object>();

  constructor() {
    this.allProducts.forEach((product: any) => {
      this.allBrands.push(product.company);
      this.allPrices.push(product.price);
    });
    this.allBrands = [...new Set(this.allBrands)];
    this.allPrices = [...new Set(this.allPrices)];
    // console.log(this.allBrands);
    // console.log(this.allPrices);
  }

  ngOnInit() {}

  onFilterChange(filterObj: any) {
    // console.log(filterObj);
    this.filterChange.emit(filterObj);
  }

  toggleDrawer() {
    this.hideDrawer = !this.hideDrawer;
  }
}
