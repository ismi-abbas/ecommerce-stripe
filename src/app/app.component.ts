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
  cartItemsCount = 0;
  currentRoute = '';
  isLoggedOut = false;
  notificationText = 'Something';

  constructor(
    public fireAuthService: AuthService,
    public cartService: CartService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.fireAuthService.isLoginSubject$.subscribe((data) => {
      if (data) {
        console.log('isLoggedInSubject ==>', data);
        this.isLoggedIn = data;
      }
    });

    this.cartService.getCartCount().subscribe((count: number) => {
      this.cartItemsCount = count;
    });

    this.cartService.cartCountSubject$.subscribe((data) => {
      this.cartItemsCount = data;
    });
  }

  onBack(): void {
    window.history.back();
  }

  logout() {
    this.isLoggedOut = true;
    this.fireAuthService.logout().subscribe((res) => {
      console.log('logout', res);
      setTimeout(() => (this.isLoggedOut = false), 2000);

      this.router.navigate(['/']);
    });
  }

  // Drawer menu
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
