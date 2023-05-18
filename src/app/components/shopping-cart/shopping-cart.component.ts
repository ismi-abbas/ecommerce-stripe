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
    this.getCartId();
    this.isLoading = true;
    this.cartService.cartItemSubject$.subscribe((res) => {
      if (res) {
        this.cart_items = res;
        console.log('cartItemSubject | shopping cart', res);
        this.cart_list = res.line_items ? res.line_items : [];
        this.total_cost = res.subtotal?.formatted_with_symbol;
        this.isLoading = false;
      }
    });
  }

  ngOnInit(): void {}

  async getCartId() {
    let id = this.cartService.getCartId();
    return id;
  }

  goToCheckout(): void {
    this.router.navigate(['checkout']);
  }

  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe((cart) => {
      this.cart_items = cart;
    });
  }

  updateCart(productId: string, quantity: number): void {
    this.cartService.updateCart(productId, quantity).subscribe((cart) => {
      this.cart_items = cart;
      this.cart_list = cart.line_items;
    });
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.message.success('Removed from cart');
    });
  }

  emptyCart(): void {
    this.cartService.emptyCart().subscribe(() => {
      this.message.success('Cart emptied');
    });
  }
}
