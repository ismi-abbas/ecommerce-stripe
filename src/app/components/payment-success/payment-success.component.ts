import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
})
export class PaymentSuccessComponent {
  title = 'Successfully purchased!';

  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 3000);
  }
}
