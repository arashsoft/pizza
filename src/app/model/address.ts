export class Address {
  addressLine1: string;
  addressLine2?: string;
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
}
