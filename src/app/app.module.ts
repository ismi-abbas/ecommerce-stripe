import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// Components
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

// Ant Design
import { AntDesignModule } from './ant-design/ant-design.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Services
import { AuthService } from './services/auth.service';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { StripePaymentComponent } from './components/stripe-payment/stripe-payment.component';
import { CheckoutPayment } from './components/checkout-payment/checkout-payment.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutAddress } from './components/checkout-address/checkout-address.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';

// Stripe
import { StripeModule } from 'stripe-angular';
import { StripeCheckoutComponent } from './components/stripe-checkout/stripe-checkout.component';
import { PaymentFailedComponent } from './components/payment-failed/payment-failed.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    CheckoutComponent,
    StripePaymentComponent,
    CheckoutPayment,
    ShoppingCartComponent,
    CheckoutAddress,
    PaymentSuccessComponent,
    StripeCheckoutComponent,
    PaymentFailedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AntDesignModule,
    StripeModule.forRoot(environment.stripe.key),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
