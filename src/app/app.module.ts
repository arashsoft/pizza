import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HomeComponent} from './pages/home/home.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MenuComponent} from './pages/menu/menu.component';
import {FoodDetailComponent} from './pages/menu/food-detail/food-detail.component';
import {CartComponent} from './pages/cart/cart.component';
import {QuantityComponent} from './pages/cart/quantity/quantity.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {PickupDeliveryComponent} from './pages/pickup-delivery/pickup-delivery.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { FoodQuestionComponent } from './pages/menu/food-detail/food-question/food-question.component';
import { SuccessSubmitComponent } from './pages/success-submit/success-submit.component';
import { LoadingIndicatorComponent } from './component/loading-indicator/loading-indicator.component';
import { RemoveItemModalComponent } from './pages/cart/quantity/remove-item-modal/remove-item-modal.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FoodDetailComponent,
    CartComponent,
    QuantityComponent,
    NavbarComponent,
    PickupDeliveryComponent,
    CheckoutComponent,
    FoodQuestionComponent,
    SuccessSubmitComponent,
    LoadingIndicatorComponent,
    RemoveItemModalComponent
  ],
  entryComponents: [PickupDeliveryComponent, RemoveItemModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
