import {Injectable} from '@angular/core';
import {Order, TipType} from '../model/order';
import {CartService} from './cart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PickupDeliveryComponent} from '../pages/pickup-delivery/pickup-delivery.component';
import {FoodProviderService} from './food-provider-service';
import {ConfigService} from './config-service';
import {HttpClient} from '@angular/common/http';
import {BackendOrderRequest} from '../model/backend/BackendOrderRequest';

@Injectable({providedIn: 'root'})
export class OrderService {

  order: Order;
  isInitialized = false;

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
    const totalWithoutTip = this.order.cart.totalPrice + this.order.discount + this.order.deliveryCharge;
    this.calculateTip(totalWithoutTip);
    this.order.totalPrice = totalWithoutTip + this.order.totalTip;
  }

  calculateTip(totalWithoutTip: number) {
    if (this.order.tipType === TipType.NONE) {
      this.order.totalTip = this.order.tipAmount || 0;
    } else if (this.order.tipType === TipType.ROUND) {
      this.order.totalTip = Math.ceil(totalWithoutTip) - totalWithoutTip;
      this.order.tipAmount = undefined;
    } else {
      this.order.totalTip = totalWithoutTip * this.order.tipType / 100;
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
