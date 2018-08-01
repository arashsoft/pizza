import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {MenusComponent} from './menus/menus.component';
import {CartComponent} from './cart/cart.component';

const routes: Routes = [
  {path: '', redirectTo: '/menus', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'menus', component: MenusComponent},
  {path: 'cart', component: CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
