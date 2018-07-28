import {FoodSection} from './foodSection';

export class Food {
  id: number;
  name: string;
  description: string;
  price: number;
  picturePath?: string;
  foodSections?: FoodSection[];
}
