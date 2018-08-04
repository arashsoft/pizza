import {FoodSection} from './foodSection';

export class Food {
  id: number;
  name: string;
  description: string;
  price: number;
  picturePath?: string;
  foodSections?: FoodSection[];

  // @lazy: total price of food based on selected foodSections
  totalPrice?: number;

  constructor(id: number, name: string, description: string, price: number, picturePath?: string, foodSections?: FoodSection[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.picturePath = picturePath;
    this.foodSections = foodSections;
  }

  /**
   * Calculate total price of food.
   * This method also string of selected food sections
   */
  public calculatePrice = (): void => {
    let totalPrice = this.price;
    if (this.foodSections) {
      for (const foodSection of this.foodSections) {
        const selectedItems = [];
        for (const foodSectionItem of foodSection.items) {
          if (foodSectionItem.value) {
            totalPrice += (foodSectionItem.price || 0);
            selectedItems.push(foodSectionItem.name);
          }
        }
        foodSection.selectedItems = selectedItems.length ? selectedItems.join(', ') : '-- empty';
      }
    }
    this.totalPrice = totalPrice;
  };

  /**
   * reset selected foodsections of the food
   */
  public reset() {
    if (this.foodSections) {
      for (const foodSection of this.foodSections) {
        for (const foodSectionItem of foodSection.items) {
          foodSectionItem.value = false;
        }
      }
    }
  }
}
