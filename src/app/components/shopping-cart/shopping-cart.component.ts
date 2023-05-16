import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '@chec/commerce.js/types/cart';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
})
export class ShoppingCartComponent {
  divsArray: any[] = Array.from({ length: 8 }, (_, i) => i);
  cart_list: any[] = [];
  cart_items: any;
  total_cost: string = '';
  cartId: string = '';
  isLoading: boolean = false;

  constructor(
    public cartService: CartService,
    private router: Router,
    private message: NzMessageService
  ) {
    this.getCartItems();
    this.getCartId();
  }

  ngOnInit(): void {}

  async getCartId() {
    let id = this.cartService.getCartId();
    console.log('getCartId', id);
    return id;
  }

  goToCheckout(): void {
    this.router.navigate(['checkout']);
  }

  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe((cart) => {
      console.log('addToCart', cart);
      this.cart_items = cart;
    });
  }

  updateCart(productId: string, quantity: number): void {
    this.cartService.updateCart(productId, quantity).subscribe((cart) => {
      console.log('updateCart', cart);
      this.cart_items = cart;
      this.cart_list = cart.line_items;
    });
  }

  removeFromCart(productId?: string): void {
    this.cart_items--;
  }

  emptyCart(): void {
    this.cartService.emptyCart().subscribe((cart) => {
      this.cart_items = cart;
      this.cartService.cartCountSubject$.next(0);
      this.cartService.cartItemSubject$.next([]);
      this.message.success('Cart emptied');
    });
  }

  getCartItems() {
    this.isLoading = true;
    this.cartService.getCartItems().subscribe((cart_item) => {
      this.cart_list = cart_item.line_items;
      this.isLoading = false;
      console.log('getCartItems', cart_item);
      this.cart_items = cart_item;
    });
  }
}
