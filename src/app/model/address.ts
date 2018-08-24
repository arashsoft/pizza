import {FoodAnswerToppingSize} from './foodAnswer';

export class Address {
  addressLine1: string;
  unitNumber?: string;
  buzzer?: string;
  postalCode: string;
  city?: string;
  province?: string;
  country?: string;

  constructor(addressLine1: string, postalCode: string) {
    this.addressLine1 = addressLine1;
    this.postalCode = postalCode;
  }

  public toString(): string {
    return [this.addressLine1,
      this.unitNumber,
      this.buzzer,
      this.postalCode,
      this.city,
      this.province,
      this.country].filter(val => val).join(', ');
  }
}
