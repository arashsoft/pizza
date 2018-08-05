export class FoodAnswer {
  id: number;
  name: string;
  price?: number;
  defaultSelected: boolean;
  selected = false;

  constructor(id, name, price?) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public toString = (): string => {
    return this.name;
  };
}
