import {Component, OnInit} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {OrderService} from '../../service/order-service';
import {Cart} from '../../model/cart';
import {Order} from '../../model/order';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: Cart;
  order: Order;
  currentCoupon: string;

  constructor(public cartService: CartService, public orderService: OrderService, private router: Router) {
  }

  ngOnInit() {
    if (this.orderService.isInitialized) {
      this.cart = this.cartService.cart;
      this.order = this.orderService.order;
      this.orderService.calculatePrice();
    } else {
      // order page is not initialized, return to menu
      this.router.navigate(['./menus']);
    }
  }

}
