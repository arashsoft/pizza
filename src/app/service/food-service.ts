import {Injectable} from '@angular/core';
import {Food} from '../model/food';
import {Global} from '../global';
import {FoodSize} from '../model/foodSize';
import {FoodQuestionService} from './food-question-service';

@Injectable({providedIn: 'root'})
export class FoodService {

  /**
   * Calculate total price of food.
   */
  public static calculateFoodPrice(food: Food): void {
    if (food.selectedSize) {
      food.totalPrice = this.getFoodSizePrice(food.selectedSize);
    } else {
      food.totalPrice = food.price;
    }
    food.totalTax = Global.priceRound(food.taxRate * food.totalPrice);
  }

  /**
   * reset food to its original state, including size and all question/answers
   */
  public static resetFood(food: Food): void {
    if (food.foodSizes) {
      for (const foodSize of food.foodSizes) {
        this.resetFoodSize(foodSize);
      }
    }
    food.selectedSize = food.defaultSelectedSize;
    this.calculateFoodPrice(food);
  }

  public static getFoodSizePrice(foodSize: FoodSize): number {
    if (foodSize.questions) {
      let totalQuestionsPrice = 0;
      for (const question of foodSize.questions) {
        totalQuestionsPrice += FoodQuestionService.getFoodQuestionPrice(question);
      }
      return totalQuestionsPrice + foodSize.price;
    } else {
      return foodSize.price;
    }
  }

  public static resetFoodSize(foodSize: FoodSize): void {
    if (foodSize.questions) {
      for (const question of foodSize.questions) {
        FoodQuestionService.resetFoodQuestion(question);
      }
    }
  }

}
