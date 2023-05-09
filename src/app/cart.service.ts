import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private subject = new Subject<any>();

  constructor() {}

  updateCart(message: string) {
    console.log('update cart');
  }

  clearCart() {
    console.log('clear cart');
  }

  getCart(): Observable<any> {
    return this.subject.asObservable();
  }
}
