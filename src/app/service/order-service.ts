import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {Order} from '../model/order';
import {CartService} from './cart.service';

@Injectable({providedIn: 'root'})
export class OrderService {

  order: Order;

  constructor(private cartService: CartService) {
    this.order = new Order(cartService.cart);
  }

}
