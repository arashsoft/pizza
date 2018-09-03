import {Food} from './food';

export class CartItem {
  food: Food;
  quantity = 1;

  constructor(food: Food, quantity?: number) {
    this.food = food;
    if (quantity) {
      this.quantity = quantity;
    }
  }
}
