import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutPayment } from './components/checkout-payment/checkout-payment.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AuthGuard } from './_helpers/auth.guard';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'checkout-address',
    component: CheckoutPayment,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: 'payment-success',
    component: PaymentSuccessComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
