import {Food} from './food';

export class CartItem {
  food: Food;
  quantity = 1;

  constructor(food: Food) {
    this.food = food;
  }
}
