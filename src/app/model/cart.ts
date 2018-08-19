import {CartItem} from './cartItem';

export class Cart {
  items: CartItem[] = [];
  // @Lazy after foodProvider got loaded
  taxRate?: number;

  // @Lazy: total price of food based on selected foodSections
  subTotalPrice?: number;

  // @Lazy: total price of food based on selected foodSections
  taxPrice?: number;

  // @Lazy: total price of food based on selected foodSections
  totalPrice?: number;
}
