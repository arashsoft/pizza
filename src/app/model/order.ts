import {Cart} from './cart';
import {User} from './user';
import {Coupon} from './coupon';
import {SavedCard} from './savedCard';
import {NewCard} from './newCard';

export class Order {
  user: User;
  cart: Cart;
  savedCard?: SavedCard;
  newCard?: NewCard;
  coupons?: Coupon[];
}
