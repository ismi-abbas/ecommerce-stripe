import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripeUrl = '<https://api.stripe.com/v1>';
  private token = '';

  constructor(private http: HttpClient) {}

  createToken(card: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${this.token}`,
    });

    const body = `card[number]=${card.cardNumber}&card[exp_month]=${card.expMonth}&card[exp_year]=${card.expYear}&card[cvc]=${card.cvc}`;

    return this.http.post(`${this.stripeUrl}/tokens`, body, { headers });
  }
}
