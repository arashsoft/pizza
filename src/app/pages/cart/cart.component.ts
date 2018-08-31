import {Component, OnInit} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {OrderService} from '../../service/order-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-page-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(public cartService: CartService,
              public orderService: OrderService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.orderService.isInitialized) {

    } else {
      // order page is not initialized, return to menu
      this.router.navigate(['./menus'], {queryParamsHandling: 'merge'});
    }
  }

}
