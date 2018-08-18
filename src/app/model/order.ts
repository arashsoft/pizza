import {Cart} from './cart';
import {User} from './user';
import {Coupon} from './coupon';
import {SavedCard} from './savedCard';
import {NewCard} from './newCard';
import {Address} from './address';

export class Order {
  user?: User;
  cart: Cart;
  savedCard?: SavedCard;
  newCard?: NewCard;
  coupons?: Coupon[];
  address: Address;
  isPickup = true;
  isForNow = true;
  scheduledFor?: string;

  constructor(cart: Cart) {
    this.cart = cart;
    this.address = new Address('', '');
  }
}
