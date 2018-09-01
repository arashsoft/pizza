import {Food} from './food';
import {DeliveryType} from './foodProvider';

export class MenuSection {
  id: number;
  name: string;
  foods: Food[];
  sortOrder: number;
  deliveryType: DeliveryType;

  constructor(menuSectionObject) {
    this.id = menuSectionObject.Id;
    this.name = menuSectionObject.Name;
    this.sortOrder = menuSectionObject.Order;
    this.deliveryType = menuSectionObject.Type;
    const foods: Food[] = [];
    menuSectionObject.Food.forEach(foodObject => {
      foods.push(new Food(foodObject, this.deliveryType));
    });
    foods.sort(function (food1, food2) {
      return food1.sortOrder - food2.sortOrder;
    });
    this.foods = foods;
  }
}
