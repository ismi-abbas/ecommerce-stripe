import { Component, Input, Output } from '@angular/core';
import { CommercejsService } from '../../services/commercejs.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '@chec/commerce.js/types/cart';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  isLoading: boolean = true;
  products: any[] = [];
  isAdded: boolean = false;
  cartItems: any = '';

  constructor(
    private commercejs: CommercejsService,
    private cartService: CartService,
    public router: Router,
    private message: NzMessageService
  ) {
    this.getProducts();
    this.cartService.cartItemSubject$.subscribe((res) => {
      if (res) {
        this.cartItems = res;
      }
    });
  }

  ngOnInit() {}

  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe((res) => {
      this.message.success('Added to cart');
      this.cartService.cartCountSubject$.next(res.total_items);
      this.cartService.cartItemSubject$.next(res);
    });
    this.isAdded = true;
  }

  getProducts() {
    this.isLoading = true;
    this.commercejs.getProducts().subscribe((products) => {
      this.isLoading = false;
      this.products = products;
    });
  }
}
