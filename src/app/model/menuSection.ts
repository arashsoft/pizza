import {Food} from './food';

export class MenuSection {
  id: number;
  name: string;
  foods: Food[];
  sortOrder: number;

  constructor(menuSectionObject) {
    this.id = menuSectionObject.Id;
    this.name = menuSectionObject.Name;
    this.sortOrder = menuSectionObject.Order;
    const foods: Food[] = [];
    menuSectionObject.Food.forEach(foodObject => {
      foods.push(new Food(foodObject));
    });
    foods.sort(function(food1, food2) {
      return food1.sortOrder - food2.sortOrder;
    });
    this.foods = foods;
  }
}
