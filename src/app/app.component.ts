import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Stripe Ecommerce';
  isLoggedIn = false;
  cart = 0;

  constructor(public fireauth: AuthService, public cartService: CartService) {}

  ngOnInit(): void {
    this.fireauth.isLoggedin = this.isLoggedIn;
    this.cart = this.cartService.getCart();
  }

  onBack(): void {
    window.history.back();
  }
}
