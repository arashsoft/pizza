import {FoodSection} from './foodSection';

export class Food {
  id: number;
  name: string;
  description: string;
  price: number;
  picturePath?: string;
  foodSections?: FoodSection[];
  totalPrice?: number;

  constructor(id: number, name: string, description: string, price: number, picturePath?: string, foodSections?: FoodSection[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.picturePath = picturePath;
    this.foodSections = foodSections;
  }

  public calculatePrice = (): void => {
    let totalPrice = this.price;
    if (this.foodSections) {
      for (const foodSection of this.foodSections) {
        for (const foodSectionItem of foodSection.items) {
          if (foodSectionItem.value) {
            totalPrice += (foodSectionItem.price || 0);
          }
        }
      }
    }
    this.totalPrice = totalPrice;
  };
}
