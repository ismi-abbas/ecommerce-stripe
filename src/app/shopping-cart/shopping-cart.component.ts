import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  divsArray: any[] = Array.from({ length: 8 }, (_, i) => i);

  cart_items: number = this.divsArray.length;
  total_cost: string = 'RM 1000000';

  constructor() {}

  ngOnInit(): void {}

  addToCart(productId?: string): void {
    this.cart_items++;
  }

  removeFromCart(productId?: string): void {
    this.cart_items--;
  }

  emptyCart(): void {
    this.cart_items = 0;
  }
}
