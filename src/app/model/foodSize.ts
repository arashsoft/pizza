import {FoodAnswer} from './foodAnswer';
import {FoodQuestion} from './foodQuestion';

export class FoodSize {
  id: number;
  name: string;
  price: number;
  questions: FoodQuestion[];
}
