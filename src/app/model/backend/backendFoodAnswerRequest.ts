import {FoodAnswer, FoodAnswerToppingSide} from '../foodAnswer';
import {FoodQuestion, FoodQuestionType} from '../foodQuestion';

export class BackendFoodAnswerRequest {
  id: number;
  quantity: number;
  toppingSide: FoodAnswerToppingSide;

  constructor(ansawer: FoodAnswer, questionType: FoodQuestionType) {
    this.id = ansawer.id;
    this.quantity =  ansawer.quantity;
    if (FoodQuestionType.TOPPING_QUANTITY){
      this.toppingSide = ansawer.toppingSide;
    }
  }
}
