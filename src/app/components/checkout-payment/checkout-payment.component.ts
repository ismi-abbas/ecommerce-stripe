import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'checkout-payment',
  templateUrl: './checkout-payment.component.html',
})
export class CheckoutPayment {
  success = false;
  payment_details = true;
  shipping_details = false;
  total_price = '0';
  loading: boolean = false;
  checkoutUrl: string = '';

  checkout_cart: any = [];
  isLoading: boolean = false;

  constructor(public cartService: CartService) {
    this.cartService.cartItemSubject$.subscribe((res) => {
      if (res) {
        this.checkoutUrl = res.hosted_checkout_url;
        this.checkout_cart = res.line_items;
        this.total_price = res.subtotal.formatted_with_symbol;
      }
    });
  }

  ngOnInit(): void {}

  payWithCommerceJs(paymentUrl: string) {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 2000);
  }
}
