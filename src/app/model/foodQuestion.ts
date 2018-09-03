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
}


export enum FoodQuestionType {
  CHECKBOX = 1, OPTION = 2, QUANTITY = 3, TOPPING_QUANTITY = 4
}
