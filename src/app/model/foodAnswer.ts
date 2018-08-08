export class FoodAnswer {
  id: number;
  name: string;
  price?: number;
  defaultSelected: boolean;

  // @Data determines if this checkbox/radio is selected or quantity of item;
  selected: boolean | number = false;

  constructor(id, name, price?) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public toString = (): string => {
    return this.name;
  };
}
