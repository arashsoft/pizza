import {FoodSize} from './foodSize';

export class Food {
  id: number;
  name: string;
  description: string;
  price: number;
  picturePath?: string;
  foodSizes?: FoodSize[];
  defaultSelectedSize?: FoodSize;

  // @Data: The size of food
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
      this.defaultSelectedSize = this.selectedSize;
    }
  }

  /**
   * Calculate total price of food.
   */
  public calculatePrice(): void {
    if (this.selectedSize) {
      this.totalPrice = this.selectedSize.getPrice();
    } else {
      this.totalPrice = this.price;
    }
  };

  /**
   * reset food to its original state, including size and all question/answers
   */
  public reset() {
    if (this.foodSizes) {
      for (const foodSize of this.foodSizes) {
        foodSize.reset();
      }
    }
    this.selectedSize = this.defaultSelectedSize;
    this.calculatePrice();
  }
}
