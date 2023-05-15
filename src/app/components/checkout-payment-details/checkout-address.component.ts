import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.css'],
})
export class CheckoutAddress {
  validateForm!: FormGroup;

  constructor() {}

  submit() {
    console.log('submit');
  }
}
