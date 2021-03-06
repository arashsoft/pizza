import {Menu} from './menu';
import {Address} from './address';

export class FoodProvider {
  id: number;
  name: string;
  logoPath: string;
  address: Address;
  taxRate: number;
  deliveryType: DeliveryType;
  minOrderForPickup: number;
  minOrderForDelivery: number;
  acceptTip: boolean;
  menus?: Menu[];
  paymentMethod: PaymentMethod;

  constructor(foodProviderObject) {
    this.id = foodProviderObject.Id;
    this.name = foodProviderObject.Name;
    this.logoPath = foodProviderObject.LogoPath;
    this.address = new Address(foodProviderObject.Address, foodProviderObject.PostalCode);
    this.address.city = foodProviderObject.City.Name;
    this.taxRate = foodProviderObject.FirstTaxRate + foodProviderObject.SecondTaxRate;
    this.deliveryType = foodProviderObject.DeliveryType;
    this.minOrderForPickup = foodProviderObject.MinOrderForPickUp;
    this.minOrderForDelivery = foodProviderObject.MinOrderForDelivery;
    this.acceptTip = foodProviderObject.AcceptOnlineTip;
    this.paymentMethod = foodProviderObject.PaymentMethod;

    const menusObject = JSON.parse(foodProviderObject.CompleteMenu.Menus);
    const menusArray: Menu[] = [];
    menusObject.forEach(menuObject => {
      menusArray.push(new Menu(menuObject));
    });
    menusArray.sort(function (menu1, menu2) {
      return menu1.sortOrder - menu2.sortOrder;
    });
    this.menus = menusArray;
  }
}

export enum DeliveryType {
  DELIVERY_ONLY = 1, PICKUP_ONLY = 2, BOTH = 3
}

export enum PaymentMethod {
  OFFLINE = 0, ONLINE = 1, BOTH = 2
}
