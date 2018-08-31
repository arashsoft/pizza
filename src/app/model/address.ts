export class Address {
  placeId?: string;
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

  loadAddress(address: Address) {
    this.placeId = address.placeId;
    this.addressLine1 = address.addressLine1;
    this.unitNumber = address.unitNumber;
    this.buzzer = address.buzzer;
    this.postalCode = address.postalCode;
    this.city = address.city;
    this.province = address.province;
    this.country = address.country;
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

  public reset(): void {
    this.placeId = '';
    this.addressLine1 = '';
    this.unitNumber = '';
    this.buzzer = '';
    this.postalCode = '';
    this.city = '';
    this.province = '';
    this.country = '';
  }
}
