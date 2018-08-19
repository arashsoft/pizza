import {Cart} from './cart';
import {User} from './user';
import {Coupon} from './coupon';
import {SavedCard} from './savedCard';
import {NewCard} from './newCard';
import {Address} from './address';
import {FoodProvider} from './foodProvider';
import {Food} from './food';

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
  tipType: TipType = TipType.PERCENTAGE10;
  tipAmount?: number;
  isPayOnline = false;
  paymentType = PaymentType.NONE;

  // @Lazy
  totalTip?: number;
  // @Lazy
  deliveryCharge = 0;
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
}

export enum TipType {
  NONE = 0, ROUND = 1, PERCENTAGE5 = 5, PERCENTAGE10 = 10, PERCENTAGE15 = 15
}

export enum PaymentType {
  NONE = 0, CASH = 1, DEBIT = 2, VISA = 3, MASTER_CARD = 4
}
