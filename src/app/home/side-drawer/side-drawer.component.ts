import { Component, OnInit } from '@angular/core';

import { storeProducts } from '../../../assets/data.js';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.css'],
})
export class SideDrawerComponent implements OnInit {
  hideDrawer: boolean = false;
  allProducts: any = storeProducts;
  allBrands: string[] = [];
  allPrices: number[] = [];
  filteredBrands: any[] = [];
  filteredPrices: any[] = [];

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

  toggleDrawer() {
    this.hideDrawer = !this.hideDrawer;
  }
}
