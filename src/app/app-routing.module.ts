import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './pages/home/home.component';
import {MenuComponent} from './pages/menu/menu.component';
import {CartComponent} from './pages/cart/cart.component';

const routes: Routes = [
  {path: '', redirectTo: '/menus', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'menus', component: MenuComponent},
  {path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
