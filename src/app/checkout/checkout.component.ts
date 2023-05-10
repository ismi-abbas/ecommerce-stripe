import { Component } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  success = false;
  payment_details = true;
  shipping_details = false;
  total_price = mock_cart.subtotal.formatted_with_symbol;

  checkout_cart: any = mock_cart.line_items;

  constructor(public cartService: CartService) {
    console.log('checkout_cart', this.checkout_cart);
  }

  ngOnInit(): void {
    // this.checkout_cart = this.cartService.getCartItems();
  }

  pay() {
    this.success = true;
    setTimeout(() => {
      this.success = false;
    }, 2000);
  }
}

const mock_cart = {
  id: 'cart_nPEVlNnPLvla7d',
  created: 1683269708,
  updated: 1683270490,
  expires: 1685862490,
  total_items: 4,
  total_unique_items: 1,
  subtotal: {
    raw: 1600,
    formatted: '1,600.00',
    formatted_with_symbol: 'RM1,600000.00',
    formatted_with_code: '1,600.00 MYR',
  },
  hosted_checkout_url: 'https://checkout.chec.io/cart/cart_nPEVlNnPLvla7d',
  meta: null,
  line_items: [
    {
      id: 'item_7RyWOwmK5nEa2V',
      product_id: 'prod_Op1YoVDj8glXLv',
      name: 'Razer BlackShark V2 Special Edition',
      product_name: 'Razer BlackShark V2 Special Edition',
      sku: 'Raz/RZ0/Hea/Bla',
      permalink: 'wuBDJQ',
      quantity: 4,
      price: {
        raw: 400,
        formatted: '400.00',
        formatted_with_symbol: 'RM400.00',
        formatted_with_code: '400.00 MYR',
      },
      line_total: {
        raw: 1600,
        formatted: '1,600.00',
        formatted_with_symbol: 'RM1,600.00',
        formatted_with_code: '1,600.00 MYR',
      },
      is_valid: true,
      product_meta: [],
      selected_options: [],
      variant: null,
      image: {
        id: 'ast_kd6Ll2KLJ1wV2m',
        url: 'https://cdn.chec.io/merchants/52052/assets/PCpAfuhTxCS6aKzk|Razer Kaira HyperSpeed - Xbox Licensed.png',
        description: null,
        is_image: true,
        filename: 'Razer Kaira HyperSpeed - Xbox Licensed.png',
        file_size: 86960,
        file_extension: 'png',
        image_dimensions: {
          width: 500,
          height: 500,
        },
        meta: [],
        created_at: 1683177850,
        updated_at: 1683177854,
      },
      tax: null,
    },
    {
      id: 'item_7RyWOwmK5nEa2V',
      product_id: 'prod_Op1YoVDj8glXLv',
      name: 'Razer BlackShark V2 Special Edition',
      product_name: 'Razer BlackShark V2 Special Edition',
      sku: 'Raz/RZ0/Hea/Bla',
      permalink: 'wuBDJQ',
      quantity: 4,
      price: {
        raw: 400,
        formatted: '400.00',
        formatted_with_symbol: 'RM400.00',
        formatted_with_code: '400.00 MYR',
      },
      line_total: {
        raw: 1600,
        formatted: '1,600.00',
        formatted_with_symbol: 'RM1,600.00',
        formatted_with_code: '1,600.00 MYR',
      },
      is_valid: true,
      product_meta: [],
      selected_options: [],
      variant: null,
      image: {
        id: 'ast_kd6Ll2KLJ1wV2m',
        url: 'https://cdn.chec.io/merchants/52052/assets/PCpAfuhTxCS6aKzk|Razer Kaira HyperSpeed - Xbox Licensed.png',
        description: null,
        is_image: true,
        filename: 'Razer Kaira HyperSpeed - Xbox Licensed.png',
        file_size: 86960,
        file_extension: 'png',
        image_dimensions: {
          width: 500,
          height: 500,
        },
        meta: [],
        created_at: 1683177850,
        updated_at: 1683177854,
      },
      tax: null,
    },
    {
      id: 'item_7RyWOwmK5nEa2V',
      product_id: 'prod_Op1YoVDj8glXLv',
      name: 'Razer BlackShark V2 Special Edition',
      product_name: 'Razer BlackShark V2 Special Edition',
      sku: 'Raz/RZ0/Hea/Bla',
      permalink: 'wuBDJQ',
      quantity: 4,
      price: {
        raw: 400,
        formatted: '400.00',
        formatted_with_symbol: 'RM400.00',
        formatted_with_code: '400.00 MYR',
      },
      line_total: {
        raw: 1600,
        formatted: '1,600.00',
        formatted_with_symbol: 'RM1,600.00',
        formatted_with_code: '1,600.00 MYR',
      },
      is_valid: true,
      product_meta: [],
      selected_options: [],
      variant: null,
      image: {
        id: 'ast_kd6Ll2KLJ1wV2m',
        url: 'https://cdn.chec.io/merchants/52052/assets/PCpAfuhTxCS6aKzk|Razer Kaira HyperSpeed - Xbox Licensed.png',
        description: null,
        is_image: true,
        filename: 'Razer Kaira HyperSpeed - Xbox Licensed.png',
        file_size: 86960,
        file_extension: 'png',
        image_dimensions: {
          width: 500,
          height: 500,
        },
        meta: [],
        created_at: 1683177850,
        updated_at: 1683177854,
      },
      tax: null,
    },
  ],
  currency: {
    code: 'MYR',
    symbol: 'RM',
  },
  discount: [],
};
