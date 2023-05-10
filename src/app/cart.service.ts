import { CommercejsService } from './commercejs.service';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  carts: number = 0;

  constructor(public commerce: CommercejsService) {}

  updateCart(message: string) {
    console.log('update cart');
  }

  clearCart() {
    console.log('clear cart');
  }

  getCartCount(): any {
    return from(this.commerce.getCommerce().cart.retrieve()).pipe(
      map((res: any) => res.total_items)
    );
  }

  getCartItems(): Observable<any> {
    return from(this.commerce.getCommerce().cart.retrieve()).pipe(
      map((res: any) => res)
    );
  }
}
