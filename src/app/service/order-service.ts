import {Injectable} from '@angular/core';
import {Order, TipType} from '../model/order';
import {CartService} from './cart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PickupDeliveryComponent} from '../pages/pickup-delivery/pickup-delivery.component';
import {FoodProviderService} from './food-provider-service';
import {ConfigService} from './config-service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Global} from '../global';

@Injectable({providedIn: 'root'})
export class OrderService {

  order: Order;
  isInitialized = false;
  // will be used to know if should calculate delivery chrage or not
  lastDestinationId?: string;

  // order confirmation  number
  confirmationNumber: string;

  constructor(private cartService: CartService,
              private modalService: NgbModal,
              private foodProviderService: FoodProviderService,
              private configService: ConfigService,
              private http: HttpClient) {
    this.order = new Order(this.cartService.cart);
  }

  initialize() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      setTimeout(() => {
        this.openPickupDelivery();
        this.foodProviderService.getFoodProvider().subscribe(
          foodProvider => {
            this.order.setFoodProvidder(foodProvider);
          });
      });
    }
  }

  openPickupDelivery(errors?) {
    const modalRef = this.modalService.open(PickupDeliveryComponent);
    modalRef.componentInstance.order = this.order;
    if (errors) {
      modalRef.componentInstance.errors = errors;
    }
  }

  calculatePrice() {
    this.cartService.calculatePrice();
    if (this.lastDestinationId !== this.order.address.placeId) {
      const params = new HttpParams()
        .append('foodProviderId', this.order.foodProvider.id.toString())
        .append('destinationPlaceId', this.order.address.placeId)
        .append('postalCode', this.order.address.postalCode);
      this.http.get(this.configService.getConfig().serverUrl + '/DeliveryCharge', {params: params}).subscribe(
        data => {
          this.lastDestinationId = this.order.address.placeId;
          // @ts-ignore: this is backend deliveryCharge reponse
          this.order.deliveryCharge = Global.priceRound(data.TotalDeliveryCharge);
          this.order.deliveryTax = Global.priceRound(this.order.deliveryCharge * this.order.foodProvider.taxRate);
          this.calculatePriceAfterDelivery();
        },
        error => {
          // TODO: tell user cannot calculate delivery charge
        }
      );
    } else {
      this.calculatePriceAfterDelivery();
    }


  }

  calculatePriceAfterDelivery() {
    const totalWithoutTip = this.order.cart.totalPrice + this.order.discount + this.order.deliveryCharge + this.order.deliveryTax;
    this.calculateTip(totalWithoutTip);
    this.order.totalPrice = Global.safeSum(totalWithoutTip, this.order.totalTip);
  }

  calculateTip(totalWithoutTip: number) {
    if (this.order.tipType === TipType.NONE) {
      this.order.totalTip = Global.priceRound(this.order.tipAmount) || 0;
    } else if (this.order.tipType === TipType.ROUND) {
      this.order.totalTip = Global.safeMinus(Math.ceil(totalWithoutTip), totalWithoutTip);
      this.order.tipAmount = undefined;
    } else {
      this.order.totalTip = Global.priceRound(totalWithoutTip * this.order.tipType / 100);
      this.order.tipAmount = undefined;
    }
  }

  updateTip(tipType: TipType): void {
    if (this.order.tipType === tipType) {
      this.order.tipType = TipType.NONE;
      this.order.tipAmount = 0;
    } else {
      this.order.tipType = tipType;
    }
    this.calculatePrice();
  }

  reset(): void {
    this.order.reset();
    this.confirmationNumber = undefined;
  }
}
