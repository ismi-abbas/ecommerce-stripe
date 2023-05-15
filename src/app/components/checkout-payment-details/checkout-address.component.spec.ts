import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAddress } from './checkout-address.component';

describe('CheckoutPaymentDetailsComponent', () => {
  let component: CheckoutAddress;
  let fixture: ComponentFixture<CheckoutAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutAddress],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutAddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
