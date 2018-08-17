import {Component} from '@angular/core';
import {CartService} from 'app/service/cart.service';
import {OrderService} from 'app/service/order-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PickupDeliveryComponent} from 'app/pages/pickup-delivery/pickup-delivery.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public cartService: CartService, public orderService: OrderService, private modalService: NgbModal) {
  }

  openPickupDelivery() {
    const modalRef = this.modalService.open(PickupDeliveryComponent);
    modalRef.componentInstance.order = this.orderService.order;
  }
}
