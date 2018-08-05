import {Menu} from './menu';
import {Address} from './address';

export class FoodProvider {
  id: number;
  name: string;
  menus?: Menu[];
  address: Address;
}
