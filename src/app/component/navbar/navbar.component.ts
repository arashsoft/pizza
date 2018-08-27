import {Component} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CartService} from '../../service/cart.service';
import {OrderService} from '../../service/order-service';
import {FoodProviderService} from '../../service/food-provider-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public cartService: CartService, public foodProviderService: FoodProviderService,
              public orderService: OrderService) {
  }
}
