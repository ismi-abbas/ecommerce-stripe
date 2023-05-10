import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '@chec/commerce.js/types/cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  divsArray: any[] = Array.from({ length: 8 }, (_, i) => i);
  cart_list: any[] = [];
  cart_items: any;
  total_cost: string = 'RM 1000000';

  constructor(public cartService: CartService) {
    this.getCartItems();
  }

  ngOnInit(): void {}

  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe((cart) => {
      console.log('addToCart', cart);
      this.cart_items = cart;
    });
  }

  removeFromCart(productId?: string): void {
    this.cart_items--;
  }

  emptyCart(): void {
    this.cart_items = 0;
  }

  getCartItems(): void {
    this.cartService.getCartItems().subscribe((cart_item) => {
      this.cart_list = cart_item.line_items;
      console.log('getCartItems', cart_item);
      this.cart_items = cart_item;
    });
  }
}
