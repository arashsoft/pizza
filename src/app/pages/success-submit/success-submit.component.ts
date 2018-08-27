import {Component, OnInit} from '@angular/core';
import {Order} from '../../model/order';
import {OrderService} from '../../service/order-service';

@Component({
  selector: 'app-success-submit',
  templateUrl: './success-submit.component.html',
  styleUrls: ['./success-submit.component.css']
})
export class SuccessSubmitComponent implements OnInit {

  name: string;
  confirmationNumber: string;

  constructor(public orderService: OrderService) {
  }

  ngOnInit() {
    this.name = this.orderService.order.orderName;
    this.confirmationNumber = this.orderService.confirmationNumber;
    this.orderService.reset();
  }

}
