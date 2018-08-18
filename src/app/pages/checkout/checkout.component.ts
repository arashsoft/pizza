import { Component, OnInit } from '@angular/core';
import {CartService} from '../../service/cart.service';
import {OrderService} from '../../service/order-service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(public cartService: CartService, public orderService: OrderService) { }

  ngOnInit() {
  }

}
