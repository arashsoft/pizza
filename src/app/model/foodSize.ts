import {FoodQuestion} from './foodQuestion';

export class FoodSize {
  id: number;
  name: string;
  price: number;
  questions?: FoodQuestion[];

  constructor(foodSizeObject: any) {
    this.id = foodSizeObject.Id;
    this.name = foodSizeObject.Text;
    this.price = foodSizeObject.Price;
    this.questions = foodSizeObject.FoodSizeOrderQuestions.map(questionObject => new FoodQuestion(questionObject));
  }
}
