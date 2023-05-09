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

  constructor(private fireauth: AuthService) {
    this.isLoggedIn = this.fireauth.isLoggedIn;
  }

  ngOnInit(): void {}

  onBack(): void {
    window.history.back();
  }
}
