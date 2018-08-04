import {FoodSectionItem} from './foodSectionItem';

export class FoodSection {
  id: number;
  name: string;
  items: FoodSectionItem[];
  // @lazy: comma separated string of selected items
  selectedItems?: string;
}
