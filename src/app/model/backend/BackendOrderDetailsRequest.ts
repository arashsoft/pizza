import {Order, PaymentType} from '../order';
import {BackendFoodRequest} from './backendFoodRequest';
import {Global} from '../../global';


export class BackendOrderDetailsRequest {
  foodProviderId: number;
  orderType: number;
  paymentMethod: string;
  totalPrice: number;
  orderPrice: number;
  deliveryCharge: number;
  deliveryTax: number;
  tip: number;
  totalTax: number;
  discount: number;
  ip: string;
  httpUserAgent: string;
  orderTiming: string;
  // It is always 1 for website ordering
  source = 1;
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
    this.orderType = order.isPickup ? 1 : 2;
    this.paymentMethod = order.isPayOnline ? 'Online Payment' : order.paymentType;

    this.totalPrice = order.totalPrice;
    this.orderPrice = order.cart.subTotalPrice;
    this.deliveryCharge = order.deliveryCharge;
    this.tip = order.totalTip;
    this.totalTax = Global.safeSum(order.cart.taxPrice, order.deliveryTax);
    this.discount = order.discount;
    this.ip = window.location.origin;
    this.httpUserAgent = navigator.userAgent;
    this.orderTiming = order.isForNow ? 'Asap' : order.scheduledFor;

    this.address = {};
    this.address.name = 'what is name?';
    this.address.phoneNumenr = 'will be added';
    if (!order.isPickup) {
      this.address.addressLine = order.address.addressLine1;
      this.address.unitNumber = order.address.unitNumber;
      this.address.buzzer = order.address.buzzer;
      this.address.postalCode = order.address.buzzer;
      this.address.city = order.address.city;
      this.address.province = order.address.province;
      this.address.country = 'will be added';
      this.address.destinationPlaceId = order.address.placeId;
    }

    order.cart.items.forEach(cartItem => {
      this.foods.push(new BackendFoodRequest(cartItem));
    });
  }
}
