import {Menu} from './menu';

export class FoodProvider {
  id: number;
  companyId: number;
  businessId?: number;
  name: string;
  logoPath: string;
  menus?: Menu[];
  phone: string;
  address: string;
  postalCode: string;
}
