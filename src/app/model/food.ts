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

  // TODO: add back-end types
  constructor(foodObject) {
    this.id = foodObject.Id;
    this.name = foodObject.Name;
    this.description = foodObject.Ingredients;
    this.price = foodObject.Price;
    this.picturePath = foodObject.PhotoPath;
    if (foodObject.FoodSizes) {
      this.foodSizes = foodObject.FoodSizes.map(foodSizeObject => new FoodSize(foodSizeObject));
    }

    if (this.foodSizes && this.foodSizes.length) {
      // find cheapest foodSize and use it as selectedSize
      this.selectedSize = this.foodSizes[0];
      for (const foodSize of this.foodSizes) {
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
