import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {Food} from '../model/food';
import {CartItem} from '../model/cartItem';
import {FoodProviderService} from './food-provider-service';
import {Order} from '../model/order';

@Injectable({providedIn: 'root'})
export class CartService {
  cart: Cart;

  constructor() {
    this.cart = new Cart;
    this.calculatePrice();
  }

  addFood(food: Food) {
    food.calculatePrice();
    this.cart.items.push(new CartItem(food));
    this.calculatePrice();
  }

  getTotalItems(): number {
    return this.cart.items.length;
  }

  clear() {
    this.cart = new Cart();
    this.calculatePrice();
  }

  /**
   * Calculate sub-total and total Price of cart
   */
  public calculatePrice(): void {
    let subTotalPrice = 0;
    for (const cartItem of this.cart.items) {
      subTotalPrice += (cartItem.quantity * cartItem.food.totalPrice);
    }
    this.cart.subTotalPrice = subTotalPrice;
    if (this.cart.taxRate) {
      this.cart.taxPrice = subTotalPrice * this.cart.taxRate;
    } else {
      this.cart.taxPrice = 0;
    }
    this.cart.totalPrice = this.cart.subTotalPrice + this.cart.taxPrice;
  };
}
