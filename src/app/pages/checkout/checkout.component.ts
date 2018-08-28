import {Component, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {OrderService} from '../../service/order-service';
import {Cart} from '../../model/cart';
import {Order, PaymentType} from '../../model/order';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {NgForm} from '@angular/forms';
import {BackendOrderRequest} from '../../model/backend/backendOrderRequest';
import {LoadingIndicatorService} from '../../service/loading-indicator-service';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../service/config-service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('newCardForm') public newCardForm?: NgForm;
  cart: Cart;
  order: Order;
  currentCoupon: string;
  errors: { [k: string]: any } = {};

  constructor(public cartService: CartService,
              public orderService: OrderService,
              private http: HttpClient,
              private configService: ConfigService,
              private loadingIndicatorService: LoadingIndicatorService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.orderService.isInitialized) {
      this.cart = this.cartService.cart;
      this.order = this.orderService.order;
      this.orderService.calculatePrice();
    } else {
      // order page is not initialized, return to menu
      this.router.navigate(['./menus']);
    }
  }

  submitOrder(): void {
    this.errors = {};
    this.validatePickupDelivery(this.errors);
    if (!_.isEmpty(this.errors)) {
      this.orderService.openPickupDelivery(this.errors);
      return;
    }
    this.validateCart(this.errors);
    if (!_.isEmpty(this.errors)) {
      if (this.errors.emptyCart) {
        $('html, body').animate({scrollTop: 0}, 'slow');
      }
      return;
    }
    // front-end validation are passed.

    this.loadingIndicatorService.startLoading('Submitting Order...');
    this.http.post(this.configService.getConfig().serverUrl + '/transactions', new BackendOrderRequest(this.order)).subscribe(
      data => {
        this.router.navigate(['./success']);
        this.loadingIndicatorService.stopLoading();
      },
      errorResponse => {
        if (errorResponse && errorResponse.error && errorResponse.error.message) {
          this.errors.backendError = errorResponse.error.message;
        } else {
          this.errors.backendError = 'There was an issue in ordering progress. Please contact the restaurant directly';
        }
        $('html, body').animate({scrollTop: 0}, 'slow');
        this.loadingIndicatorService.stopLoading();
      }
    );
  }

  validateCart(errors: { [k: string]: any }) {
    if (!this.order.isPayOnline) {
      if (this.order.paymentType === PaymentType.NONE) {
        errors.paymentType = 'Please select a payment type';
      }
    } else {
      if (_.isEmpty(this.order.newCard.cardNumber) || _.isEmpty(this.order.newCard.nameOnCard)
        || _.isEmpty(this.order.newCard.ccv) || _.isEmpty(this.order.newCard.month)
        || _.isEmpty(this.order.newCard.year)) {
        this.newCardForm.form.markAsPristine();
        errors.newCard = 'Please enter your card information completely';
      }
    }
    if (_.isEmpty(this.order.cart.items)) {
      errors.emptyCart = 'There is not any item in your cart';
    }
  }

  validatePickupDelivery(errors: { [k: string]: any }) {
    if (_.isEmpty(this.order.orderName)) {
      errors.orderName = 'Please enter your name';
    }
    if (_.isEmpty(this.order.orderPhoneNumber)) {
      errors.orderPhoneNumber = 'Please enter your phone number';
    }
    if (!this.order.isPickup && _.isEmpty(this.order.address.placeId)) {
      errors.address = 'Please select your address from suggested menu';
    }
    if (!this.order.isForNow && _.isEmpty(this.order.scheduledFor)) {
      errors.scheduledFor = 'Please enter the scheduled time';
    }
  }
}
