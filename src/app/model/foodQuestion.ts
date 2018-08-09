import {FoodAnswer} from './foodAnswer';
import * as _ from 'lodash';

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

  constructor(id, name, type, answers: FoodAnswer[], numberOfFreeItems?) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.answers = answers;
    if (numberOfFreeItems > 0) {
      this.numberOfFreeItems = numberOfFreeItems;
      this.lowestItemPrice = _.min(_.pluck(answers, 'price'));
    }
  }

  /**
   * Calculate the foodQuestion price. Also, generates selectedItems string.
   * Store them on @Lazy{totalPrice} and @Lazy{selectedItems}
   */
  getPrice(): number {
    let totalPrice = 0;
    const selectedItems: Array<FoodAnswer> = [];
    if (this.type === FoodQuestionType.OPTION || this.type === FoodQuestionType.CHECKBOX) {
      for (const answer of this.answers) {
        if (answer.selected) {
          totalPrice += answer.price;
          selectedItems.push(answer);
        }
      }
    } else if (this.type === FoodQuestionType.QUANTITY) {
      for (const answer of this.answers) {
        if (answer.quantity > 0) {
          totalPrice += (answer.price * answer.quantity);
          selectedItems.push(answer);
        }
      }
    } else {
      throw new Error('Unknown food Type');
    }
    // reduce free items price
    if (this.numberOfFreeItems) {
      totalPrice -= (this.numberOfFreeItems * this.lowestItemPrice);
    }
    this.totalPrice = totalPrice > 0 ? totalPrice : 0;
    this.selectedItems = selectedItems.join(', ');
    return this.totalPrice;
  }

  reset(): void {
    this.totalPrice = 0;
    this.selectedItems = '';
    for (const answer of this.answers) {
      answer.reset();
    }
  }
}


export enum FoodQuestionType {
  CHECKBOX, OPTION, QUANTITY
}
