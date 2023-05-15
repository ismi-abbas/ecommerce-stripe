import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css'],
})
export class CheckoutPayment {
  success = false;
  payment_details = true;
  shipping_details = false;
  total_price = 0;
  loading: boolean = false;

  checkout_cart: any = [];
  isLoading: boolean = false;

  constructor(public cartService: CartService) {
    this.loadCartItems();
  }

  loadCartItems() {
    this.isLoading = true;
    this.cartService
      .getCartItems()
      .pipe(
        map((cartItems) => {
          this.checkout_cart = cartItems.line_items;
          this.total_price = cartItems.subtotal.formatted_with_symbol;
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  ngOnInit(): void {}

  pay() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 2000);
  }
}
