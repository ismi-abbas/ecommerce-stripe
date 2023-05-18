import { CommercejsService } from './commercejs.service';
import { Injectable } from '@angular/core';
import { DeleteResponse } from '@chec/commerce.js/features/cart';
import { Cart } from '@chec/commerce.js/types/cart';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  public cartCountSubject$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  carts: number = 0;

  constructor(public commerce: CommercejsService) {}

  getCartId() {
    return this.commerce.getCommerce().cart.id();
  }

  addToCart(productId: string): Observable<Cart> {
    return from(this.commerce.getCommerce().cart.add(productId, 1)).pipe(
      map((res: any) => {
        this.carts = res.total_items;
        return res;
      })
    );
  }

  updateCart(productId: string, quantity: number): Observable<Cart> {
    return from(
      this.commerce.getCommerce().cart.update(productId, { quantity })
    ).pipe(
      map((res: any) => {
        this.cartItemSubject$.next(res);
        this.cartCountSubject$.next(res.total_items);
        return res;
      })
    );
  }

  removeFromCart(productId: string): Observable<Cart> {
    return from(this.commerce.getCommerce().cart.remove(productId)).pipe(
      map((res: any) => {
        this.cartItemSubject$.next(res);
        this.cartCountSubject$.next(res.total_items);
        return res;
      })
    );
  }

  emptyCart(): Observable<Cart> {
    return from(this.commerce.getCommerce().cart.empty()).pipe(
      map((res: any) => {
        this.carts = res.total_items;
        return res;
      })
    );
  }

  deleteCart(): Observable<any> {
    return from(this.commerce.getCommerce().cart.delete()).pipe(
      map((res: DeleteResponse) => {
        this.cartCountSubject$.next(0);
        this.cartItemSubject$.next(null);
        return res;
      })
    );
  }

  updateCartCount(): void {
    this.cartCountSubject$.next(this.carts++);
  }

  getCartCount(): Observable<any> {
    return from(this.commerce.getCommerce().cart.retrieve()).pipe(
      map((res: any) => {
        this.cartCountSubject$.next(res.total_items);
        return res.total_items;
      })
    );
  }

  getCartItems(): Observable<Cart> {
    return from(this.commerce.getCommerce().cart.retrieve()).pipe(
      map((res: Cart) => {
        return res;
      })
    );
  }
}
