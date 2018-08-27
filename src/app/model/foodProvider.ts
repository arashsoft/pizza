import {Menu} from './menu';
import {Address} from './address';

export class FoodProvider {
  id: number;
  name: string;
  logoPath: string;
  address: Address;
  taxRate: number;
  menus?: Menu[];

  // TODO: add back-end types
  constructor(foodProviderObject) {
    this.id = foodProviderObject.Id;
    this.name = foodProviderObject.Name;
    this.logoPath = foodProviderObject.LogoPath;
    this.address = new Address(foodProviderObject.Address, foodProviderObject.PostalCode);
    this.taxRate = foodProviderObject.FirstTaxRate + foodProviderObject.SecondTaxRate;

    const menusObject = JSON.parse(foodProviderObject.CompleteMenu.Menus);
    const menusArray: Menu[] = [];
    menusObject.forEach(menuObject => {
      menusArray.push(new Menu(menuObject));
    });
    menusArray.sort(function(menu1, menu2) {
      return menu1.sortOrder - menu2.sortOrder;
    });
    this.menus = menusArray;
  }
}
