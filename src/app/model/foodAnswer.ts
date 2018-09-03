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
  toppingSide = FoodAnswerToppingSide.FULL;

  // @Lazy: total price of this answer. Gets populated by foodQuestion.getPrice()
  totalPrice?: number;

  constructor(answerObject, ratio: number) {
    this.id = answerObject.Id;
    this.name = answerObject.Text;
    this.price = answerObject.Price * ratio;
    if (answerObject.defaultSelected) {
      this.selected = answerObject.defaultSelected;
    }
    if (answerObject.defaultQuantity) {
      this.quantity = answerObject.defaultQuantity;
    }
  }
}

export enum FoodAnswerToppingSide {
  FULL = 1, LEFT = 2, RIGHT = 3
}
