import {FoodSize} from './foodSize';
import {Global} from '../global';
import {DeliveryType} from './foodProvider';

export class Food {
  id: number;
  name: string;
  description: string;
  price: number;
  picturePath?: string;
  foodSizes?: FoodSize[];
  defaultSelectedSize?: FoodSize;
  taxRate: number;
  sortOrder: number;
  deliveryType: DeliveryType;
  startDate: Date;
  endDate: Date;

  // @Data: The size of food
  selectedSize?: FoodSize;

  // @Lazy: total price of food based on selected foodSections
  totalPrice?: number;

  // @Lazy: The amount of tax on this specific food
  totalTax?: number;

  constructor(foodObject, deliveryType: DeliveryType, startDate: Date, endDate: Date) {
    this.id = foodObject.Id;
    this.name = foodObject.Name;
    this.description = foodObject.Ingredients;
    this.price = foodObject.Price;
    this.picturePath = foodObject.PhotoPath;
    this.sortOrder = foodObject.Order;
    this.taxRate = Global.safeSum(foodObject.FirstTaxRate, foodObject.SecondTaxRate);
    this.deliveryType = deliveryType;
    if (foodObject.FoodSizes) {
      this.foodSizes = foodObject.FoodSizes.map(foodSizeObject => new FoodSize(foodSizeObject));
    }

    this.startDate = startDate;
    this.endDate = endDate;

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
}
