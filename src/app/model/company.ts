import {Menu} from './menu';
import {Address} from './address';
import {FoodProvider} from './foodProvider';

export class Company {
  // TODO: probably remove it
  id: string;
  name: string;
  foodProviders: FoodProvider[];
}
