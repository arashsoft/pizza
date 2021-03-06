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
import {DeliveryType} from '../../model/foodProvider';

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
      const self = this;
      this.cart = this.cartService.cart;
      this.order = this.orderService.order;
      this.orderService.calculatePrice();
      $('html, body').animate({scrollTop: 0}, 'fast');
      ConfigService.findIP(function (ip) {
        self.order.userIP = ip;
      });
    } else {
      // order page is not initialized, return to menu
      this.router.navigate(['./menus'], {queryParamsHandling: 'merge'});
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
      $('html, body').animate({scrollTop: 0}, 'slow');
      return;
    }
    // front-end validation are passed.

    this.loadingIndicatorService.startLoading('Submitting Order...');
    this.http.post(this.configService.getConfig().serverUrl + '/transactions', new BackendOrderRequest(this.order)).subscribe(
      data => {
        this.router.navigate(['./success'], {queryParamsHandling: 'merge'});
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
      } else {
        const cardType = this.order.newCard.getCardType();
        if (cardType !== 'VISA' && cardType !== 'Mastercard' && cardType !== 'AMEX') {
          errors.newCard = 'Cart Type is not supported. Please use Visa, MasterCard, or American Express';
        }
      }
    }
    if (_.isEmpty(this.order.cart.items)) {
      errors.emptyCart = 'Your Cart is Empty';
      return;
    }
    if (this.order.isPickup) {
      this.cart.items.every(cartItem => {
        if (cartItem.food.deliveryType === DeliveryType.DELIVERY_ONLY) {
          errors.deliveryPickupOnly = cartItem.food.name + ' is delivery only and cannot get ordered as pickup.';
          return false;
        } else {
          return true;
        }
      });
      if (this.order.totalPrice < this.order.foodProvider.minOrderForPickup) {
        errors.minOrder = 'The minimum order price for pickup is ' + this.order.foodProvider.minOrderForPickup;
        return;
      }
    } else {
      this.cart.items.every(cartItem => {
        if (cartItem.food.deliveryType === DeliveryType.PICKUP_ONLY) {
          errors.deliveryPickupOnly = cartItem.food.name + ' is pickup only and cannot get ordered as delivery.';
          return false;
        } else {
          return true;
        }
      });
      if (this.order.totalPrice < this.order.foodProvider.minOrderForDelivery) {
        errors.minOrder = 'The minimum order price for delivery is ' + this.order.foodProvider.minOrderForDelivery;
        return;
      }
    }
    // validate maxAnswer
    this.cart.items.forEach(cartItem => {
      if (cartItem.food.selectedSize.questions) {
        cartItem.food.selectedSize.questions.every(question => {
          if (question.errorMessage !== undefined) {
            errors.maxAnswer = question.errorMessage + ' ' + question.name + ' for item ' + cartItem.food.name;
            return false;
          } else {
            return true;
          }
        });
      }
    });
  }

  validatePickupDelivery(errors: { [k: string]: any }) {
    if (_.isEmpty(this.order.orderName)) {
      errors.orderName = 'Please enter your name';
    }
    if (_.isEmpty(this.order.orderPhoneNumber)) {
      errors.orderPhoneNumber = 'Please enter your phone number';
    } else if (this.order.orderPhoneNumber.length !== 10) {
      errors.orderPhoneNumber = 'Phone number must have 10 digits';
    }
    if (!this.order.isPickup && _.isEmpty(this.order.address.placeId)) {
      errors.address = 'Please select your address from suggested menu';
    }
    if (!this.order.isForNow && _.isEmpty(this.order.scheduledFor)) {
      errors.scheduledFor = 'Please enter the scheduled time';
    }
  }
}
