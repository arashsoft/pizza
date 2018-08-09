export class FoodAnswer {
  id: number;
  name: string;
  price = 0;
  defaultSelected?: boolean;
  defaultQuantity?: number;

  // @Data: determines if this checkbox/radio is selected;
  selected = false;
  // @Data: determines the quantity of answer
  quantity = 0;

  constructor(id, name, price?, defaultSelected?, defaultQuantity?) {
    this.id = id;
    this.name = name;
    this.price = price;
    if (defaultSelected) {
      this.selected = defaultSelected;
    }
    if (defaultQuantity) {
      this.quantity = defaultQuantity;
    }
  }

  public toString = (): string => {
    return this.name;
  };

  reset(): void {
    this.selected = this.defaultSelected || false;
    this.quantity = this.defaultQuantity || 0;
  }
}
