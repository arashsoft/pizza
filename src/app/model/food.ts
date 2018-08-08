import {FoodSize} from './foodSize';

export class Food {
  id: number;
  name: string;
  description: string;
  price: number;
  picturePath?: string;
  foodSizes?: FoodSize[];

  // @Data
  selectedSize?: FoodSize;

  // @Lazy: total price of food based on selected foodSections
  totalPrice?: number;

  constructor(id: number, name: string, description: string, price: number, picturePath?: string, foodSizes?: FoodSize[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.picturePath = picturePath;
    this.foodSizes = foodSizes;

    if (foodSizes && foodSizes.length) {
      // find cheapest foodSize and use it as selectedSize
      this.selectedSize = foodSizes[0];
      for (const foodSize of foodSizes) {
        if (this.selectedSize.price > foodSize.price) {
          this.selectedSize = foodSize;
        }
      }
    }
  }

  /**
   * Calculate total price of food.
   */
  public calculatePrice = (): void => {
    let totalPrice = this.price;
    if (this.foodSizes) {
      totalPrice = this.selectedSize.price;
      for (const question of this.selectedSize.questions) {
        totalPrice += question.getPrice();
      }
    }
    this.totalPrice = totalPrice;
  };

  /**
   * reset food to its original state, including size and all question/answers
   */
  public reset() {
    if (this.foodSections) {
      for (const foodSection of this.foodSections) {
        for (const foodSectionItem of foodSection.items) {
          foodSectionItem.selected = false;
        }
      }
    }
  }
}
