import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPaymentDetailsComponent } from './checkout-payment-details.component';

describe('CheckoutPaymentDetailsComponent', () => {
  let component: CheckoutPaymentDetailsComponent;
  let fixture: ComponentFixture<CheckoutPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutPaymentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
