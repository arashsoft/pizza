import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {Food} from '../model/food';
import {CartItem} from '../model/cartItem';
import {Global} from '../global';
import {OrderStorageService} from './order-storage-service';
import {Order} from '../model/order';
import {FoodService} from './food-service';

@Injectable({providedIn: 'root'})
export class CartService {
  cart: Cart;

  constructor(private orderStorageService: OrderStorageService) {
    this.cart = new Cart;
    this.calculatePrice();
  }

  addFood(food: Food) {
    FoodService.calculateFoodPrice(food);
    this.cart.items.push(new CartItem(food));
    this.calculatePrice();
    this.shakeCart();
  }

  private shakeCart(): void {
    const cartIcon = $('.top-cart-icon, .top-cart-counter');
    cartIcon.addClass('shake');
    setTimeout(() => cartIcon.removeClass('shake'), 1000);
  }

  removeFoodByIndex(index: number) {
    this.cart.items.splice(index, 1);
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
    let subTotalTax = 0;
    for (const cartItem of this.cart.items) {
      subTotalPrice = Global.safeSum(subTotalPrice, Global.priceRound(cartItem.quantity * cartItem.food.totalPrice));
      subTotalTax = Global.safeSum(subTotalTax, Global.priceRound(cartItem.quantity * cartItem.food.totalTax));
    }
    this.cart.subTotalPrice = subTotalPrice;
    this.cart.taxPrice = subTotalTax;
    this.cart.totalPrice = this.cart.subTotalPrice + this.cart.taxPrice;
  }
}
