import {Order} from '../order';
import {BackendOrderDetailsRequest} from './BackendOrderDetailsRequest';

export class BackendOrderRequest {
  orderModel: BackendOrderDetailsRequest;
  paymentModel?: {
    cardNumber?: string;
    expiryDate?: string;
    cardHolderName?: string;
    cardType?: string;
    cvn?: string;
  };

  constructor(order: Order) {
    this.orderModel = new BackendOrderDetailsRequest(order);

    if (order.isPayOnline) {
      this.paymentModel = {};
      this.paymentModel.cardNumber = order.newCard.cardNumber.toString();
      this.paymentModel.expiryDate = order.newCard.month.toString() + order.newCard.year.toString();
      this.paymentModel.cardHolderName = order.newCard.nameOnCard;
      this.paymentModel.cardType = order.newCard.GetCardType();
      this.paymentModel.cvn = order.newCard.ccv.toString();
    }
  }
}
