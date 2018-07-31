import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {Food} from '../model/food';

@Injectable({providedIn: 'root'})
export class CartService {
  cart = new Cart;

  addFood(food: Food) {
    this.cart.foods.push(food);
  }

  clear() {
    this.cart = new Cart();
  }
}
