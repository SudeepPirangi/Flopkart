import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.css'],
})
export class SideDrawerComponent implements OnInit {
  hideDrawer: boolean = true;
  @Input() products: any;
  allBrands: string[] = [];
  priceRanges: any[] = [
    '$1 - $250',
    '$251 - $500',
    '$501 - $750',
    '$751 - $1000',
    '$1001+',
  ];
  allFilters = {
    brands: [],
    priceRanges: [],
  };

  @Output() filterChange = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.products.forEach((product: any) => {
      this.allBrands.push(product.company);
    });
    this.allBrands = [...new Set(this.allBrands)];
    // console.log(this.allBrands);
    // console.log(this.priceRanges);
  }

  onFilterChange(event) {
    const thisType = event.target.name;
    const thisParam = event.target.value;
    const thisIsChecked = event.target.checked;
    if (thisIsChecked) {
      if (thisType === 'brand') {
        this.allFilters.brands.push(thisParam);
      } else if (thisType === 'priceRange') {
        this.allFilters.priceRanges.push(thisParam);
      }
    } else {
      if (thisType === 'brand') {
        this.allFilters.brands = this.allFilters.brands.filter((brand) => {
          return brand !== thisParam;
        });
      } else if (thisType === 'priceRange') {
        this.allFilters.priceRanges = this.allFilters.priceRanges.filter(
          (price) => {
            return price !== thisParam;
          }
        );
      }
    }
    this.filterChange.emit(this.allFilters);
  }

  toggleDrawer() {
    this.hideDrawer = !this.hideDrawer;
  }
}
