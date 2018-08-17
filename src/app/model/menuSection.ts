import {Food} from './food';

export class MenuSection {
  id: number;
  name: string;
  foods: Food[];

  // TODO: add back-end types
  constructor(menuSectionObject) {
    this.id = menuSectionObject.MenuSectionId;
    this.name = menuSectionObject.Name;
    const foods: Food[] = [];
    menuSectionObject.Food.forEach(foodObject => {
      foods.push(new Food(foodObject));
    });
    this.foods = foods;
  }
}
