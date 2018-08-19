import {Injectable} from '@angular/core';
import {Order} from '../model/order';
import {CartService} from './cart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PickupDeliveryComponent} from '../pages/pickup-delivery/pickup-delivery.component';
import {FoodProviderService} from './food-provider-service';

@Injectable({providedIn: 'root'})
export class OrderService {

  order: Order;
  isInitialized = false;

  constructor(private cartService: CartService, private modalService: NgbModal, private foodProviderService: FoodProviderService) {
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
}
