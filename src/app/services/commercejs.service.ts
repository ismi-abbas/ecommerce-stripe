import { Injectable } from '@angular/core';
import Commerce from '@chec/commerce.js';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '@chec/commerce.js/types/product';

@Injectable({
  providedIn: 'root',
})
export class CommercejsService {
  private commerce: Commerce;
  constructor() {
    this.commerce = new Commerce(environment.commercejs.publicKey, true);
  }

  public getCommerce(): Commerce {
    return this.commerce;
  }

  getProducts(): Observable<Product[]> {
    return from(this.commerce.products.list()).pipe(
      map((res: any) => res.data)
    );
  }
}
