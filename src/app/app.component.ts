import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Stripe Ecommerce';
  isLoggedIn = false;

  constructor(public fireauth: AuthService) {}

  ngOnInit(): void {
    this.fireauth.isLoggedin = this.isLoggedIn;
  }

  onBack(): void {
    window.history.back();
  }
}
