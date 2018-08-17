import {Component, OnInit} from '@angular/core';
import {Menu} from '../../model/menu';
import {FoodProviderResource} from '../../resource/food-provider-resource';
import {OrderService} from '../../service/order-service';


@Component({
  selector: 'app-page-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Menu[];

  constructor(private foodProviderResource: FoodProviderResource, private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.initialize();
    this.foodProviderResource.getFoodProvider().subscribe(data => this.menus = data.menus);
  }

}
