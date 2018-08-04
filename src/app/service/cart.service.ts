import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {Food} from '../model/food';
import {CartItem} from '../model/cartItem';

@Injectable({providedIn: 'root'})
export class CartService {
  cart = new Cart;

  addFood(food: Food) {
    food.calculatePrice();
    this.cart.items.push(new CartItem(food));
    this.cart.calculatePrice();
  }

  getTotalItems(): number {
    return this.cart.items.length;
  }

  clear() {
    this.cart = new Cart();
    this.cart.calculatePrice();
  }
}
