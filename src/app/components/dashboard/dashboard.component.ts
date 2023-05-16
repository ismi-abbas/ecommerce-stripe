import { Component, Input, Output } from '@angular/core';
import { CommercejsService } from '../../services/commercejs.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '@chec/commerce.js/types/cart';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isLoading: boolean = true;
  products: any[] = [];
  isAdded: boolean = false;

  constructor(
    private commercejs: CommercejsService,
    private cartService: CartService,
    public router: Router,
    private message: NzMessageService
  ) {
    this.getProducts();
  }

  ngOnInit() {}

  addToCart(productId: string): void {
    this.cartService.addToCart(productId).subscribe((res) => {
      this.cartService.cartCountSubject$.next(res.total_items);
      this.message.success('Product added to cart');
    });
    this.isAdded = true;
  }

  getProducts() {
    this.isLoading = true;
    this.commercejs.getProducts().subscribe((products) => {
      console.log('products from observable', products);
      this.isLoading = false;
      this.products = products;
    });
  }

  sendData(data: any) {
    console.log('Data send ===>', data.value);
    this.cartService.sendNotiData(data.value);
  }
}
