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
    addressLine: string;
    unitNumber: string;
    buzzer: string;
    postalCode: string;
    city: string;
    province: string;
    country: string;
    phoneNumenr: string;
    destinationPlaceId: string;
  };
  foods: BackendFoodRequest[];
  paymentModel: {
    cardNumber: string;
    expiryDate: string;
    cardHolderName: string;
    cardType: string;
    cvn: string;
  };

  constructor(order: Order) {
    this.foodProviderId = order.foodProvider.id;
    this.deliveryStatus = order.isPickup ? 1 : 0;
  }
}
