import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MenusComponent} from './menus/menus.component';
import {FoodDetailComponent} from './food-detail/food-detail.component';
import {CartComponent} from './cart/cart.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MenusComponent,
    FoodDetailComponent,
    CartComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
