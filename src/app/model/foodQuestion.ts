import {FoodAnswer} from './foodAnswer';

export class FoodQuestion {
  id: number;
  name: string;
  // type: // 3 enums
  answers: FoodAnswer[];
  // @lazy: comma separated string of selected items
  selectedItems?: string;
}
