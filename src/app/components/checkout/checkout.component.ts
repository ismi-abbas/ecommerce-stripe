import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CheckoutPayment } from '../checkout-payment/checkout-payment.component';
import { StripeService } from 'src/app/services/stripe.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  isMobile: boolean = false;
  nzDirection: 'horizontal' | 'vertical' = 'horizontal';

  success = false;
  payment_details = true;
  shipping_details = false;
  total_price = '0';

  checkout_cart: any = [];
  loading: boolean = false;

  // payment
  isPaymentProcessing = false;
  isPaymentSuccessful = false;
  isPaymentFailed = false;
  isCartLoading = false;

  constructor(
    public cartService: CartService,
    private router: Router,
    private stripeService: StripeService
  ) {
    if (this.checkout_cart.length === 0) {
      this.cartService.cartItemSubject$.subscribe((res) => {
        if (res) {
          this.checkout_cart = res.line_items;
          this.total_price = res.subtotal.formatted_with_symbol;
        }
      });
    }
  }

  ngOnInit(): void {}

  pay() {
    const checkoutPayment = new CheckoutPayment(
      this.cartService,
      this.stripeService,
      this.router
    );

    checkoutPayment.payWithStripe(this.checkout_cart);
  }

  current = 0;

  pre(): void {
    this.current -= 1;
    this.changeContent();
    this.isPaymentProcessing = false;
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  // payment
  done(): void {
    if (this.checkout_cart.length > 0) {
      this.isPaymentProcessing = true;
      setTimeout(() => {
        this.isPaymentProcessing = false;
        this.isPaymentSuccessful = true;
        this.router.navigate(['/payment-success']);
      }, 4000);
    } else {
      this.isCartLoading = true;
      setTimeout(() => {
        this.isCartLoading = false;
      }, 4000);
    }
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        break;
      }
      case 1: {
        break;
      }
      case 2: {
        break;
      }
      default: {
      }
    }
  }
}
