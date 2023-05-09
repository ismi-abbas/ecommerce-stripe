import { Component } from '@angular/core';
import { CommercejsService } from '../commercejs.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  products: any[] = [];
  carts: any[] = [];

  constructor(private commercejs: CommercejsService) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.commercejs
      .getCommerce()
      .products.list()
      .then((res) => {
        this.products = res.data;
        console.log(this.products);
      });
  }

  addToCart(productId: string) {
    this.commercejs
      .getCommerce()
      .cart.add(productId, 1)
      .then((res) => {
        console.log(res);
      });
  }

  getCart() {
    this.commercejs
      .getCommerce()
      .cart.retrieve()
      .then((res) => {
        console.log('cart ==>', res);
        this.carts = res.line_items;
      });
  }
}
