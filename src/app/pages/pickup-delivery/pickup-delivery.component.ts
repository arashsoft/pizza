import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {OrderService} from '../../service/order-service';

@Component({
  selector: 'app-pickup-delivery-modal',
  templateUrl: './pickup-delivery.component.html',
  styleUrls: ['./pickup-delivery.component.css']
})
export class PickupDeliveryComponent {
  constructor(public activeModal: NgbActiveModal, public orderService: OrderService) {
  }
}
