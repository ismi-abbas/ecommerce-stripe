import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  success = false;
  payment_details = true;
  shipping_details = false;
  total_price = 0;

  checkout_cart: any = [];
  loading: boolean = false;

  constructor(public cartService: CartService) {
    this.loadCartItems();
  }

  loadCartItems() {
    this.loading = true;
    this.cartService
      .getCartItems()
      .pipe(
        map((cartItems) => {
          this.checkout_cart = cartItems.line_items;
          this.total_price = cartItems.subtotal.formatted_with_symbol;
          console.log('checkout_cart', cartItems);
          this.loading = false;
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
