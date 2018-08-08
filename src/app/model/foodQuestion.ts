import {FoodAnswer} from './foodAnswer';

export class FoodQuestion {
  id: number;
  name: string;
  type: FoodQuestionType;
  answers: FoodAnswer[];
  // @Lazy: comma separated string of selected items
  selectedItems?: string;
}


export enum FoodQuestionType {
  CHECKBOX, OPTION, QUANTITY
}
