import {Order} from './order';
import {Address} from './address';
import {SavedCard} from './savedCard';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  previousOrders?: Order[];
  addresses?: Address[];
  cards?: SavedCard[];
}
