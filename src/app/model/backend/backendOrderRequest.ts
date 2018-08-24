import {Order} from '../order';
import {BackendFoodRequest} from './backendFoodRequest';

export class BackendOrderRequest {
  foodProviderId: number;
  deliveryStatus: number;
  totalPrice: number;
  orderCharge: number;
  deliveryCharge: number;
  tipCharge: number;
  taxCharge: number;
  discount: number;
  ip: string;
  httpUserAgent: string;
  orderTiming: string;
  address: {
    name?: string;
    addressLine?: string;
    unitNumber?: string;
    buzzer?: string;
    postalCode?: string;
    city?: string;
    province?: string;
    country?: string;
    phoneNumenr?: string;
    destinationPlaceId?: string;
  };
  foods: BackendFoodRequest[] = [];
  paymentModel: {
    cardNumber?: string;
    expiryDate?: string;
    cardHolderName?: string;
    cardType?: string;
    cvn?: string;
  };

  constructor(order: Order) {
    this.foodProviderId = order.foodProvider.id;
    this.deliveryStatus = order.isPickup ? 1 : 0;
    this.totalPrice = order.totalPrice;
    this.orderCharge = order.cart.subTotalPrice;
    this.deliveryCharge = order.deliveryCharge;
    this.tipCharge = order.tipAmount;
    this.taxCharge = order.cart.taxPrice;
    this.discount = order.discount;
    this.ip = window.location.origin;
    this.httpUserAgent = navigator.userAgent;
    this.orderTiming = order.isForNow ? 'NOW' : order.scheduledFor;

    this.address = {};
    this.address.name = 'what is name?';
    this.address.addressLine = order.address.addressLine1;
    this.address.unitNumber = order.address.unitNumber;
    this.address.buzzer = order.address.buzzer;
    this.address.postalCode = order.address.buzzer;
    this.address.city = order.address.city;
    this.address.province = order.address.province;
    this.address.country = 'will be added';
    this.address.phoneNumenr = 'will be added';
    this.address.destinationPlaceId = order.address.placeId;

    this.paymentModel = {};
    this.paymentModel.cardNumber = order.newCard.cardNumber.toString();
    this.paymentModel.expiryDate = order.newCard.month.toString() + order.newCard.year.toString();
    this.paymentModel.cardHolderName = order.newCard.nameOnCard;
    // TODO : to be discoussed
    this.paymentModel.cardType = order.paymentType.toString();
    this.paymentModel.cvn = order.newCard.ccv.toString();

    order.cart.items.forEach(cartItem => {
      this.foods.push(new BackendFoodRequest(cartItem));
    });
  }
}
