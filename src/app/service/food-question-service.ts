import {Injectable} from '@angular/core';
import {FoodQuestion, FoodQuestionType} from '../model/foodQuestion';
import {Global} from '../global';
import {FoodAnswer, FoodAnswerToppingSide} from '../model/foodAnswer';

@Injectable({providedIn: 'root'})
export class FoodQuestionService {

  /**
   * Calculate the foodQuestion price. Also, generates selectedItems string.
   * Store them on @Lazy{totalPrice} and @Lazy{selectedItems}
   */
  public static getFoodQuestionPrice(foodQuestion: FoodQuestion): number {
    let totalPrice = 0;
    let answerCount = 0;
    const selectedItems: Array<FoodAnswer> = [];
    if (foodQuestion.type === FoodQuestionType.OPTION || foodQuestion.type === FoodQuestionType.CHECKBOX) {
      for (const answer of foodQuestion.answers) {
        if (answer.selected) {
          answer.totalPrice = answer.price;
          answerCount++;
          totalPrice += answer.totalPrice;
          selectedItems.push(answer);
        } else {
          answer.totalPrice = 0;
        }
      }
    } else if (foodQuestion.type === FoodQuestionType.QUANTITY || foodQuestion.type === FoodQuestionType.TOPPING_QUANTITY) {
      for (const answer of foodQuestion.answers) {
        if (answer.quantity > 0) {
          if (answer.toppingSide === FoodAnswerToppingSide.FULL) {
            answerCount += answer.quantity;
            answer.totalPrice = Global.priceRound(answer.price * answer.quantity);
            totalPrice += answer.totalPrice;
          } else if (answer.toppingSide === FoodAnswerToppingSide.LEFT || answer.toppingSide === FoodAnswerToppingSide.RIGHT) {
            answerCount += (answer.quantity / 2);
            answer.totalPrice = Global.priceRound(answer.price * answer.quantity / 2);
            totalPrice += answer.totalPrice;
          } else {
            throw new Error('Unknown topping side');
          }
          selectedItems.push(answer);
        } else {
          answer.totalPrice = 0;
        }
      }
    } else {
      throw new Error('Unknown food Type');
    }

    if (foodQuestion.maxAnswer && foodQuestion.maxAnswer < answerCount) {
      foodQuestion.errorMessage = 'Cannot select more than ' + foodQuestion.maxAnswer;
    } else {
      foodQuestion.errorMessage = undefined;
    }
    foodQuestion.answerCount = answerCount;

    // reduce free items price
    if (foodQuestion.numberOfFreeItems) {
      totalPrice = Global.safeMinus(totalPrice, Global.priceRound(foodQuestion.numberOfFreeItems * foodQuestion.lowestItemPrice));
    }
    foodQuestion.totalPrice = totalPrice > 0 ? totalPrice : 0;
    foodQuestion.selectedItems = selectedItems.length ? selectedItems.map(this.foodAnswerToString).join(', ') : '-no selection';
    foodQuestion.hasAnyAnswer = selectedItems.length > 0;
    return foodQuestion.totalPrice;
  }

  public static resetFoodQuestion(foodQuestion: FoodQuestion): void {
    foodQuestion.totalPrice = 0;
    foodQuestion.selectedItems = '';
    for (const answer of foodQuestion.answers) {
      this.resetFoodAnswer(answer);
    }
  }

  public static foodAnswerToString(foodAnswer: FoodAnswer): string {
    let returnValue = foodAnswer.name;
    if (foodAnswer.quantity && foodAnswer.quantity > 1) {
      returnValue = foodAnswer.quantity + 'x ' + returnValue;
    }
    if (foodAnswer.toppingSide === FoodAnswerToppingSide.FULL) {
      return returnValue;
    } else if (foodAnswer.toppingSide === FoodAnswerToppingSide.RIGHT) {
      return returnValue + '(right side)';
    } else if (foodAnswer.toppingSide === FoodAnswerToppingSide.LEFT) {
      return returnValue + '(left side)';
    }
    return returnValue;
  }

  public static resetFoodAnswer(foodAnswer: FoodAnswer): void {
    foodAnswer.selected = foodAnswer.defaultSelected || false;
    foodAnswer.quantity = foodAnswer.defaultQuantity || 0;
    foodAnswer.totalPrice = 0;
  }

  // used for radio type answers in order to uncheck other answers
  public checkFoodQuestionAnswer(foodQuestion: FoodQuestion, answerIndex: number) {
    foodQuestion.answers.forEach(answer => answer.selected = false);
    foodQuestion.answers[answerIndex].selected = true;
  }
}
