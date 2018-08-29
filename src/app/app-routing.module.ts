import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {MenuComponent} from './pages/menu/menu.component';
import {CartComponent} from './pages/cart/cart.component';
import {CheckoutComponent} from './pages/checkout/checkout.component';
import {SuccessSubmitComponent} from './pages/success-submit/success-submit.component';
import {BaseRouterComponent} from './pages/base-router/base-router.component';

const routes: Routes = [
  {path: '', component: BaseRouterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'menus', component: MenuComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'success', component: SuccessSubmitComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
