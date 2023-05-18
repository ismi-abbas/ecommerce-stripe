import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

interface checkoutSessionResponse {
  sessionId: string;
}

declare const Stripe: any;
@Injectable({
  providedIn: 'root',
})
export class StripeService {
  functionsUrls: string = environment.functionsUrls;
  constructor(private http: HttpClient, private router: Router) {}

  createStripeCheckoutSession({
    items,
    success_url,
    cancel_url,
  }: {
    items: any;
    success_url: string;
    cancel_url: string;
  }): any {
    console.log('createStripeCheckoutSession', {
      items,
      success_url,
      cancel_url,
    });
    return from(
      this.http
        .post(
          `${this.functionsUrls}/v2/checkout`,
          {
            items,
            success_url,
            cancel_url,
          },
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            }),
          }
        )
        .pipe(
          map((res: any) => {
            console.log(res);
            return res;
          })
        )
    );
  }
}
