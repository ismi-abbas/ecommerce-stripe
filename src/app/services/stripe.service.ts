import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare const Stripe: any;
@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripeUrl = 'https://api.stripe.com/v1';
  private token = '';

  constructor(private http: HttpClient) {}

  requestMemberShip(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post(`${this.stripeUrl}/checkout/sessions`, {
      headers,
      success_url: 'https://example.com/success',
      line_items: [{ price: 'price_H5ggYwtDq4fbrJ', quantity: 2 }],
      mode: 'payment',
    });
  }

  getPrice(price: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    return this.http.post(`${this.stripeUrl}/prices`, {
      headers,
      body: {
        unit_amount: price,
        currency: 'myr',
      },
    });
  }

  redirectToStripeCheckout(): void {
    const stripe = Stripe(this.token);
    stripe.redirectToCheckout({
      items: [{ sku: 'sku_GBJ2kZ0QjXjJZI', quantity: 1 }],
      successUrl: 'http://localhost:4200/success',
      cancelUrl: 'http://localhost:4200/cancel',
    });
  }
}
