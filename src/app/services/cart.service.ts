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
  private cartSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  public carts$: Observable<number> = this.cartSubject$.asObservable();

  public notificationSubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('Something in here');

  public cartItemSubject$: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  public cartCountSubject$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  public cartCount$: Observable<number> = this.cartCountSubject$.asObservable();

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
        this.carts = res.total_items;
        this.cartCountSubject$.next(this.carts++);
        return res;
      })
    );
  }

  // Clear cart content but not delete the cart
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
        this.carts = 0;
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
      map((res: Cart) => res)
    );
  }

  sendNotiData(data: string) {
    this.notificationSubject$.next(data);
    console.log('data received ===>', data);
  }
}
