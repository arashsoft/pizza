import {Injectable} from '@angular/core';
import {Order} from '../model/order';
import {CartService} from './cart.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PickupDeliveryComponent} from '../pages/pickup-delivery/pickup-delivery.component';

@Injectable({providedIn: 'root'})
export class OrderService {

  order: Order;
  isInitialized = false;

  constructor(private cartService: CartService, private modalService: NgbModal) {
    this.order = new Order(cartService.cart);
  }

  initialize() {
    if (!this.isInitialized) {
      this.isInitialized = true;
      setTimeout(() => {
        const modalRef = this.modalService.open(PickupDeliveryComponent);
        modalRef.componentInstance.order = this.order;
      });
    }
  }
}
