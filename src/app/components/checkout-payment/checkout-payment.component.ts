import { Product } from '@chec/commerce.js/types/product';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { StripeService } from 'src/app/services/stripe.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

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

  constructor(
    public cartService: CartService,
    private stripe: StripeService,
    private router: Router
  ) {
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

  payWithStripe() {
    this.loading = true;
    this.stripe
      .createStripeCheckoutSession(this.checkout_cart)
      .subscribe((res: any) => {
        console.log(res);
        this.loading = false;
        this.checkoutUrl = res.sessionId;
      });
  }

  async handleCheckout(items: any[]) {
    let data: any = [];
    items.map((item) => {
      data.push({
        name: item.name,
        price: item.price.raw,
        quantity: item.quantity,
        product: item.image.url,
      });
    });

    await console.log('checkoutItems', data);

    try {
      this.stripe.createStripeCheckoutSession(data).subscribe((res: any) => {
        console.log(res);
        this.redirectToStripeCheckout(res.sessionId);
      });
    } catch (error) {
      console.error(error);
    }
  }

  redirectToStripeCheckout(sessionId: string) {
    const stripe = Stripe(environment.stripe.key); // Replace with your Stripe publishable key

    stripe
      .redirectToCheckout({
        sessionId: sessionId,
      })
      .then((result: any) => {
        if (result.error) {
          console.error(result.error);
        } else {
          this.router.navigate(['/payment-success']);
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
