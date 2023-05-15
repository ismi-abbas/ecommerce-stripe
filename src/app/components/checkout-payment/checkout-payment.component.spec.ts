import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPayment } from './checkout-payment.component';

describe('CheckoutAddressComponent', () => {
  let component: CheckoutPayment;
  let fixture: ComponentFixture<CheckoutPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutPayment],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
