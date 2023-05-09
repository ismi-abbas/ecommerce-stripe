import { Injectable } from '@angular/core';
import Commerce from '@chec/commerce.js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommercejsService {
  private commerce: Commerce;

  constructor() {
    this.commerce = new Commerce(environment.commercejs.publicKey, true);
  }

  getProducts(): any {
    this.commerce.products.list().then((response: any) => {
      console.log(response.data);
      return response.data;
    });
  }
}
