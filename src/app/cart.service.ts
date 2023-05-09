import { CommercejsService } from './commercejs.service';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  carts: number = 0;
  private subject = new Subject<any>();

  constructor(public commerce: CommercejsService) {}

  updateCart(message: string) {
    console.log('update cart');
  }

  clearCart() {
    console.log('clear cart');
  }

  getCart(): any {
    this.commerce
      .getCommerce()
      .cart.retrieve()
      .then((res) => {
        this.carts = res.total_items;
        console.log('cart ==>', res);
        return res.total_items;
      });
  }
}
