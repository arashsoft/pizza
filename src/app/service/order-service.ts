import {Injectable} from '@angular/core';
import {Order, TipType} from '../model/order';
import {CartService} from './cart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PickupDeliveryComponent} from '../pages/pickup-delivery/pickup-delivery.component';
import {FoodProviderService} from './food-provider-service';
import {ConfigService} from './config-service';
import {HttpClient} from '@angular/common/http';
import {BackendOrderRequest} from '../model/backend/BackendOrderRequest';
import {Global} from '../global';
import {BackendDeliveryChargeRequest} from '../model/backend/backendDeliveryChargeRequest';

@Injectable({providedIn: 'root'})
export class OrderService {

  order: Order;
  isInitialized = false;
  // will be used to know if should calculate delivery chrage or not
  lastDestinationId?: string;

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

  openPickupDelivery() {
    const modalRef = this.modalService.open(PickupDeliveryComponent);
    modalRef.componentInstance.order = this.order;
  }

  calculatePrice() {
    this.cartService.calculatePrice();
    if (this.lastDestinationId !== this.order.address.placeId) {
      this.http.post(this.configService.getConfig().serverUrl + '/DeliveryCharge',
        new BackendDeliveryChargeRequest(this.order.foodProvider.id, this.order.address.placeId, this.order.address.postalCode)).subscribe(
        data => {
          this.lastDestinationId = this.order.address.placeId;
          // @ts-ignore: this is backend deliveryCharge reponse
          this.order.deliveryCharge = Global.priceRound(data.totalDeliveryCharge);
          this.order.deliveryTax = Global.priceRound(this.order.deliveryCharge * this.order.foodProvider.taxRate);
        },
        error => {
          // TODO: tell user cannot calculate deliverry charge
        }
      );
    } else {

    }

    const totalWithoutTip = this.order.cart.totalPrice + this.order.discount + this.order.deliveryCharge;
    this.calculateTip(totalWithoutTip);
    this.order.totalPrice = Global.safeSum(totalWithoutTip, this.order.totalTip);
  }

  calculateTip(totalWithoutTip: number) {
    if (this.order.tipType === TipType.NONE) {
      this.order.totalTip = Global.priceRound(this.order.tipAmount) || 0;
    } else if (this.order.tipType === TipType.ROUND) {
      this.order.totalTip = Math.ceil(totalWithoutTip) - totalWithoutTip;
      this.order.tipAmount = undefined;
    } else {
      this.order.totalTip = Global.priceRound(totalWithoutTip * this.order.tipType / 100);
      this.order.tipAmount = undefined;
    }
  }

  updateTip(tipType: TipType): void {
    this.order.tipType = tipType;
    this.calculatePrice();
  }

  submitOrder(): void {
    this.http.post(this.configService.getConfig().serverUrl + '/transactions', new BackendOrderRequest(this.order)).subscribe(
      data => {

      },
      error => {

      }
    );
  }
}
