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

  public async payWithStripe(items: any[]) {
    console.log(items);
    let data: any = [];
    items.map((item) => {
      data.push({
        name: item.name,
        price: item.price.raw,
        quantity: item.quantity,
        product: 'raw',
      });
    });

    await console.log('checkoutItems', data);
    this.stripe.paymentInfo.next(items);

    try {
      this.stripe
        .createStripeCheckoutSession({
          items: data,
          success_url: 'http://localhost:5173/payment-success',
          cancel_url: 'http://localhost:5173/payment-cancel',
        })
        .subscribe((res: any) => {
          console.log(res);
          this.redirectToStripeCheckout(res.id);
        });
    } catch (error) {
      console.error(error);
    }
  }

  public redirectToStripeCheckout(sessionId: string) {
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
