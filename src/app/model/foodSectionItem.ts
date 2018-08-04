export class FoodSectionItem {
  id: number;
  name: string;
  price?: number;
  value = false;

  constructor(id, name, price?) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public toString = (): string => {
    return this.name;
  };
}
