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
    if (this.taxRate) {
      this.taxPrice = subTotalPrice * this.taxRate;
    } else {
      this.taxPrice = 0;
    }
    this.totalPrice = this.subTotalPrice + this.taxPrice;
  };

}
