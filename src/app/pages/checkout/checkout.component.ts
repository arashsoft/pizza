import {Component, OnInit} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {OrderService} from '../../service/order-service';
import {Cart} from '../../model/cart';
import {Order} from '../../model/order';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: Cart;
  order: Order;
  currentCoupon: string;
  constructor(public cartService: CartService, public orderService: OrderService) {
  }

  ngOnInit() {
    this.cart = this.cartService.cart;
    this.order = this.orderService.order;
    this.orderService.calculatePrice();
  }

}
