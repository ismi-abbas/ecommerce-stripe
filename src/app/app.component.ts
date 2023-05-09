import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ecommerce-stripe';
  isLoggedIn = true;

  constructor() {}

  ngOnInit(): void {}

  onBack(): void {
    window.history.back();
  }
}
