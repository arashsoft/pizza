import {FoodAnswer} from './foodAnswer';
import * as _ from 'lodash';

export class FoodQuestion {
  id: number;
  name: string;
  type: FoodQuestionType;
  answers: FoodAnswer[];
  numberOfFreeItems?: number;
  lowestItemPrice?: number;
  maxAnswer?: number;
  errorMessage?: string;
  mustBeAnswered?: boolean;

  // @Lazy : determines if this question has any selected answer
  hasAnyAnswer?: boolean;
  // @Lazy : number of selected answers for this question. It can be include half values because of half topping sides
  answerCount: number;
  // @Lazy: comma separated string of selected items
  selectedItems?: string;
  // @Lazy: total price of this question
  totalPrice?: number;

  constructor(questionObject) {
    this.id = questionObject.Id;
    this.name = questionObject.Text;
    this.type = questionObject.Type;
    this.mustBeAnswered = questionObject.MustBeAnswered;
    this.maxAnswer = questionObject.MaxAnswer;
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
