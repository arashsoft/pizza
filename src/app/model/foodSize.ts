import {FoodQuestion} from './foodQuestion';

export class FoodSize {
  id: number;
  name: string;
  price: number;
  questions?: FoodQuestion[];

  constructor(foodSizeObject: any) {
    this.id = foodSizeObject.FoodSizeId;
    this.name = foodSizeObject.Text;
    this.price = foodSizeObject.Price;
    this.questions = foodSizeObject.Foodsizeorderquestion.map(questionObject => new FoodQuestion(questionObject));
  }

  getPrice(): number {
    if (this.questions) {
      let totalQuestionsPrice = 0;
      for (const question of this.questions) {
        totalQuestionsPrice += question.getPrice();
      }
      return totalQuestionsPrice + this.price;
    } else {
      return this.price;
    }
  }

  reset(): void {
    if (this.questions) {
      for (const question of this.questions) {
        question.reset();
      }
    }
  }
}
