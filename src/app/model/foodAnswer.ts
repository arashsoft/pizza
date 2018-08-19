export class FoodAnswer {
  id: number;
  name: string;
  price = 0;
  defaultSelected?: boolean;
  defaultQuantity?: number;

  // @Data: determines if this checkbox/radio is selected;
  selected = false;
  // @Data: determines the quantity of answer
  quantity = 0;
  // @Data: pizza topping side
  toppingSide = FoodAnswerToppingSize.FULL;

  // @Lazy: total price of this answer. Gets populated by foodQuestion.getPrice()
  totalPrice?: number;

  // TODO: add back-end types
  constructor(answerObject, ratio: number) {
    this.id = answerObject.OrderAnswerId;
    this.name = answerObject.Text;
    this.price = answerObject.Price * ratio;
    if (answerObject.defaultSelected) {
      this.selected = answerObject.defaultSelected;
    }
    if (answerObject.defaultQuantity) {
      this.quantity = answerObject.defaultQuantity;
    }
  }

  public toString = (): string => {
    if (this.toppingSide === FoodAnswerToppingSize.FULL) {
      return this.name;
    } else if (this.toppingSide === FoodAnswerToppingSize.RIGHT) {
      return this.name + '(right side)';
    } else if (this.toppingSide === FoodAnswerToppingSize.LEFT) {
      return this.name + '(left side)';
    }
    return this.name;
  };

  reset(): void {
    this.selected = this.defaultSelected || false;
    this.quantity = this.defaultQuantity || 0;
    this.totalPrice = 0;
  }
}

export enum FoodAnswerToppingSize {
  FULL = 1, LEFT = 2, RIGHT = 3
}
