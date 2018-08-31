import {Cart} from './cart';
import {User} from './user';
import {Coupon} from './coupon';
import {SavedCard} from './savedCard';
import {NewCard} from './newCard';
import {Address} from './address';
import {FoodProvider} from './foodProvider';

export class Order {
  user?: User;
  cart: Cart;
  // @Lazy after foodProvider got loaded
  foodProvider?: FoodProvider;
  savedCard?: SavedCard;
  newCard = new NewCard();
  coupons?: Coupon[];
  address: Address;
  isPickup = true;
  isForNow = true;
  scheduledFor?: string;
  tipType: TipType = TipType.NONE;
  tipAmount = 0;
  isPayOnline = false;
  paymentType = PaymentType.NONE;
  orderName = '';
  orderPhoneNumber = '';

  // @Lazy
  totalTip?: number;
  // @Lazy
  deliveryCharge = 0;
  // @Lazy
  deliveryTax = 0;
  // @Lazy
  discount = 0;
  // @Lazy
  totalPrice?: number;

  constructor(cart: Cart) {
    this.cart = cart;
    this.address = new Address('', '');
  }

  setFoodProvidder(foodProvider: FoodProvider) {
    this.foodProvider = foodProvider;
    this.cart.taxRate = foodProvider.taxRate;
  }

  reset() {
    this.cart.reset();
    this.newCard = new NewCard();
    this.coupons = undefined;
    this.address = new Address('', '');
    this.isPickup = true;
    this.isForNow = true;
    this.scheduledFor = undefined;
    this.tipType = TipType.PERCENTAGE10;
    this.tipAmount = undefined;
    this.isPayOnline = false;
    this.paymentType = PaymentType.NONE;
    this.orderName = '';
    this.orderPhoneNumber = '';

    this.totalTip = undefined;
    this.deliveryCharge = 0;
    this.deliveryTax = 0;
    this.discount = 0;
    this.totalPrice = undefined;
  }

  loadOrder(order: Order) {
    this.cart.loadCart(order.cart);
    this.coupons = order.coupons;
    this.address.loadAddress(order.address);
    this.isPickup = order.isPickup;
    this.isForNow = order.isForNow;
    this.scheduledFor = order.scheduledFor;
    this.tipType = order.tipType;
    this.tipAmount = order.tipAmount;
    this.isPayOnline = order.isPayOnline;
    this.paymentType = order.paymentType;
    this.orderName = order.orderName;
    this.orderPhoneNumber = order.orderPhoneNumber;
    this.discount = order.discount;
  }
}

export enum TipType {
  NONE = 0, ROUND = 1, PERCENTAGE5 = 5, PERCENTAGE10 = 10, PERCENTAGE15 = 15
}

export enum PaymentType {
  NONE = 'None', CASH = 'Cash', DEBIT = 'Debit', VISA = 'Visa', MASTER_CARD = 'MasterCard'
}
