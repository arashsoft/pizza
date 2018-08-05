import {FoodAnswer} from './foodAnswer';
import {FoodQuestion} from './foodQuestion';

export class FoodSize {
  id: number;
  name: string;
  questions: FoodQuestion[];
  // @lazy: comma separated string of selected items
  selectedItems?: string;
}
