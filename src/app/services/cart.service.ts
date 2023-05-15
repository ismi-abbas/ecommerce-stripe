import { CommercejsService } from './commercejs.service';
import { Injectable } from '@angular/core';
import { DeleteResponse } from '@chec/commerce.js/features/cart';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  carts: number = 0;

  constructor(public commerce: CommercejsService) {}

  getCartId() {
    return this.commerce.getCommerce().cart.id();
  }

  addToCart(productId: string) {
    return from(this.commerce.getCommerce().cart.add(productId, 1)).pipe(
      map((res: any) => {
        this.carts = res.total_items;
        return res;
      })
    );
  }

  updateCart(productId: string, quantity: number) {
    return from(
      this.commerce.getCommerce().cart.update(productId, { quantity })
    ).pipe(
      map((res: any) => {
        this.carts = res.total_items;
        return res;
      })
    );
  }

  // Clear cart content but not delete the cart
  emptyCart() {
    return from(this.commerce.getCommerce().cart.empty()).pipe(
      map((res: any) => {
        this.carts = res.total_items;
        return res;
      })
    );
  }

  deleteCart() {
    return from(this.commerce.getCommerce().cart.delete()).pipe(
      map((res: DeleteResponse) => {
        this.carts = 0;
        return res;
      })
    );
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
