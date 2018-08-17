import {Component} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Input} from '@angular/core';
import {Order} from '../../model/order';

@Component({
  selector: 'modal-pickup-delivery-modal',
  templateUrl: './pickup-delivery.component.html',
  styleUrls: ['./pickup-delivery.component.css']
})
export class PickupDeliveryComponent {
  @Input() order: Order;

  constructor(public activeModal: NgbActiveModal) {
  }
}
