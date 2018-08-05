import {Menu} from './menu';
import {Address} from './address';
import {FoodProvider} from './foodProvider';

export class Company {
  id: string;
  name: string;
  logoPath: string;
  foodProviders: FoodProvider[];
}
