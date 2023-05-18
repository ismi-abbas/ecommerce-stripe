import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
})
export class PaymentSuccessComponent {
  title = 'Successfully purchased!';
  paymentInfo: any = {};

  constructor(
    private router: Router,
    private cart: CartService,
    private stripe: StripeService
  ) {
    cart.deleteCart();
    this.stripe.paymentInfo.subscribe((res: any) => {
      this.paymentInfo = res;
    });
  }
}
