import {FoodQuestion} from './foodQuestion';

export class FoodSize {
  id: number;
  name: string;
  price: number;
  questions?: FoodQuestion[];


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
