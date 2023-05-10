import { Component, Input, Output } from '@angular/core';
import { CommercejsService } from '../commercejs.service';
import { CartService } from '../cart.service';
import { Cart } from '@chec/commerce.js/types/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isLoading: boolean = false;
  products: any[] = [];
  @Input('cart_items_count') cart_items: number = 0;
  @Input('isAdded') isAdded: boolean = false;

  constructor(
    private commercejs: CommercejsService,
    private cartService: CartService,
    public router: Router
  ) {
    this.getProducts();
    this.cartService.getCartCount().subscribe((count: number) => {
      this.cart_items = count;
    });
  }

  ngOnInit() {}

  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe((res) => {
      console.log('addToCart', res.total_items);
      this.cart_items = res.total_items;
    });
    this.isAdded = true;
  }

  getProducts() {
    this.isLoading = true;
    this.commercejs.getProducts().subscribe((products) => {
      console.log('products from observable', products);
      this.products = products;
    });
  }
}
