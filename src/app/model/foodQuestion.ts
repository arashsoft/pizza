import {FoodAnswer, FoodAnswerToppingSide} from './foodAnswer';
import * as _ from 'lodash';
import {Global} from '../global';

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
    this.id = questionObject.Id;
    this.name = questionObject.Text;
    this.type = questionObject.Type;
    this.numberOfFreeItems = questionObject.MaxFreeAnswer;
    this.answers = questionObject.OrderQuestion.OrderAnswers.map(answerObject => new FoodAnswer(answerObject, questionObject.Ratio));
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
          if (answer.toppingSide === FoodAnswerToppingSide.FULL) {
            answer.totalPrice = Global.priceRound(answer.price * answer.quantity);
            totalPrice += answer.totalPrice;
          } else if (answer.toppingSide === FoodAnswerToppingSide.LEFT || answer.toppingSide === FoodAnswerToppingSide.RIGHT) {
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
    // reduce free items price
    if (this.numberOfFreeItems) {
      totalPrice = Global.safeMinus(totalPrice, Global.priceRound(this.numberOfFreeItems * this.lowestItemPrice));
    }
    this.totalPrice = totalPrice > 0 ? totalPrice : 0;
    this.selectedItems = selectedItems.length ? selectedItems.join(', ') : '-no selection';
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
