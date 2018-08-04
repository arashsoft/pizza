import {CartItem} from './cartItem';

export class Cart {
  items = new Array<CartItem>();

  // @lazy: total price of food based on selected foodSections
  subTotalPrice?: number;

  // @lazy: total price of food based on selected foodSections
  taxPrice?: number;

  // @lazy: total price of food based on selected foodSections
  totalPrice?: number;

  constructor() {
    this.calculatePrice();
  }

  /**
   * Calculate sub-total and total Price of cart
   */
  public calculatePrice = (): void => {
    let subTotalPrice = 0;
    for (const cartItem of this.items) {
      subTotalPrice += (cartItem.quantity * cartItem.food.totalPrice);
    }
    this.subTotalPrice = subTotalPrice;
  };

}
