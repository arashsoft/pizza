export class BackendDeliveryChargeRequest {
  foodProviderId: number;
  destinationPlaceId: string;
  postalCode: string;

  constructor(foodProviderId: number, destinationPlaceId: string, postalCode: string) {
    this.foodProviderId = foodProviderId;
    this.destinationPlaceId = destinationPlaceId;
    this.postalCode = postalCode;
  }
}
