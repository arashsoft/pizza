import {FoodAnswer, FoodAnswerToppingSize} from './foodAnswer';
import * as _ from 'lodash';

export class FoodQuestion {
  id: number;
  name: string;
  type: FoodQuestionType;
  answers: FoodAnswer[];
  numberOfFreeItems?: number;
  lowestItemPrice?: number;

  // @Lazy: comma separated string of selected items
  selectedItems?: string;
  // @Lazy: total price of this question
  totalPrice?: number;

  // TODO: add back-end type
  constructor(questionObject) {
    this.id = questionObject.FoodsizeOrderquestionId;
    this.name = questionObject.Text;
    this.type = questionObject.Type;
    this.numberOfFreeItems = questionObject.MaxFreeAnswer;
    this.answers = questionObject.OrderQuestion.Orderanswer.map(answerObject => new FoodAnswer(answerObject, questionObject.Ratio));
    if (this.numberOfFreeItems > 0) {
      this.lowestItemPrice = _.min(_.map(this.answers, 'price'));
    }
  }

  /**
   * Calculate the foodQuestion price. Also, generates selectedItems string.
   * Store them on @Lazy{totalPrice} and @Lazy{selectedItems}
   */
  getPrice(): number {
    let totalPrice = 0;
    const selectedItems: Array<FoodAnswer> = [];
    if (this.type === FoodQuestionType.OPTION || this.type === FoodQuestionType.CHECKBOX) {
      for (const answer of this.answers) {
        if (answer.selected) {
          answer.totalPrice = answer.price;
          totalPrice += answer.totalPrice;
          selectedItems.push(answer);
        } else {
          answer.totalPrice = 0;
        }
      }
    } else if (this.type === FoodQuestionType.QUANTITY || this.type === FoodQuestionType.TOPPING_QUANTITY) {
      for (const answer of this.answers) {
        if (answer.quantity > 0) {
          if (answer.toppingSide === FoodAnswerToppingSize.FULL) {
            answer.totalPrice = answer.price * answer.quantity;
            totalPrice += answer.totalPrice;
          } else if (answer.toppingSide === FoodAnswerToppingSize.LEFT || answer.toppingSide === FoodAnswerToppingSize.RIGHT) {
            answer.totalPrice = (answer.price * answer.quantity / 2);
            totalPrice += answer.totalPrice;
          } else {
            throw new Error('Unknown topping sise');
          }
          selectedItems.push(answer);
        } else {
          answer.totalPrice = 0;
        }
      }
    } else {
      throw new Error('Unknown food Type');
    }
    // reduce free items price
    if (this.numberOfFreeItems) {
      totalPrice -= (this.numberOfFreeItems * this.lowestItemPrice);
    }
    this.totalPrice = totalPrice > 0 ? totalPrice : 0;
    this.selectedItems = selectedItems.join(', ');
    return this.totalPrice;
  }

  reset(): void {
    this.totalPrice = 0;
    this.selectedItems = '';
    for (const answer of this.answers) {
      answer.reset();
    }
  }
}


export enum FoodQuestionType {
  OPTION = 1, CHECKBOX = 2, QUANTITY = 3, TOPPING_QUANTITY = 4
}
