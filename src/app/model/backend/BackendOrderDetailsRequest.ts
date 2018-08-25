import {Order} from '../order';
import {BackendFoodRequest} from './backendFoodRequest';


export class BackendOrderDetailsRequest {
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
    this.orderTiming = order.isForNow ? 'Asap' : order.scheduledFor;

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

    order.cart.items.forEach(cartItem => {
      this.foods.push(new BackendFoodRequest(cartItem));
    });
  }
}
