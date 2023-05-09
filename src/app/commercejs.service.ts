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

  public getCommerce(): Commerce {
    return this.commerce;
  }
}
