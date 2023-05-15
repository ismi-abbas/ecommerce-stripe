import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  onDashboard: boolean = false;
  title = 'Stripe Ecommerce';
  isLoggedIn = false;
  cart = 0;
  currentRoute = '';

  constructor(
    public fireAuthService: AuthService,
    public cartService: CartService,
    public router: Router
  ) {
    this.isLoggedIn = this.fireAuthService.loggedIn;
    console.log('isLoggedIn', this.isLoggedIn);
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        console.log(event.url);
        this.currentRoute = event.url;
        this.onDashboard = event.url === '/dashboard';
      });

    this.cartService.getCartCount().subscribe((count: number) => {
      this.cart = count;
    });
  }

  ngOnInit(): void {}

  onBack(): void {
    window.history.back();
  }
}
