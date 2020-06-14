import { Component } from '@angular/core';
import { storeProducts } from 'src/assets/data.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  products = storeProducts;

  constructor() {}
}
