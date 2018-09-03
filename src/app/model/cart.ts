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

  reset() {
    this.items = [];
    this.subTotalPrice = 0;
    this.taxPrice = 0;
    this.totalPrice = 0;
  }

  loadCart(cart: Cart) {
    cart.items.forEach(cartItem => {
      this.items.push(new CartItem(cartItem.food, cartItem.quantity));
    });
  }
}
