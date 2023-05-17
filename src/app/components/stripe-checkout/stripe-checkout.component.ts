import { Component } from '@angular/core';
import { StripeScriptTag } from 'stripe-angular';

@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
})
export class StripeCheckoutComponent {
  constructor(private stripeScriptTag: StripeScriptTag) {
    if (!this.stripeScriptTag.StripeInstance) {
      this.stripeScriptTag.setPublishableKey('');
    }
  }
  cardCaptureReady = false;

  onStripeInvalid(error: Error) {
    console.log('Validation Error', error);
  }

  onStripeError(error: Error) {
    console.error('Stripe error', error);
  }

  setPaymentMethod(token: stripe.paymentMethod.PaymentMethod) {
    console.log('Stripe Payment Method', token);
  }

  setStripeToken(token: stripe.Token) {
    console.log('Stripe Token', token);
  }

  setStripeSource(source: stripe.Source) {
    console.log('Stripe Source', source);
  }
}
