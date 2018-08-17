import {Menu} from './menu';
import {Address} from './address';

export class FoodProvider {
  id: number;
  name: string;
  logoPath: string;
  address: Address;
  menus?: Menu[];

  // TODO: add back-end types
  constructor(foodProviderObject) {
    this.id = foodProviderObject.FoodProviderId;
    this.name = foodProviderObject.Name;
    this.logoPath = foodProviderObject.LogoPath;
    this.address = new Address(foodProviderObject.Address, foodProviderObject.PostalCode);

    const menusObject = JSON.parse(foodProviderObject.CompleteMenu.Menus);
    const menusArray: Menu[] = [];
    menusObject.forEach(menuObject => {
      menusArray.push(new Menu(menuObject));
    });
    this.menus = menusArray;
  }
}
