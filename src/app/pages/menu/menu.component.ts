import {Component, OnInit} from '@angular/core';
import {Menu} from '../../model/menu';
import {FoodProviderService} from '../../service/food-provider-service';
import {OrderService} from '../../service/order-service';


@Component({
  selector: 'app-page-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Menu[];

  constructor(private foodProviderService: FoodProviderService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.initialize();
    this.foodProviderService.getFoodProvider().subscribe(data => this.menus = data.menus);
  }

}
