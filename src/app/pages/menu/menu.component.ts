import {Component, OnInit} from '@angular/core';
import {Menu} from '../../model/menu';
import {FoodProviderService} from '../../service/food-provider-service';
import {OrderService} from '../../service/order-service';
import * as $ from 'jquery';
import {MenuSection} from '../../model/menuSection';

@Component({
  selector: 'app-page-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Menu[];
  subMenuMap = {};

  constructor(private foodProviderService: FoodProviderService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.initialize();
    this.foodProviderService.getFoodProvider().subscribe(data => {
      this.menus = data.menus;
    });

    // $(window).on('scroll', _.throttle(this.updatePosition, 200));
  }

  updatePosition(): void {
    const scrollTop = $(window).scrollTop();
    $('.menu-food-item-container').each((index, element) => {
      const menuTop = $(element).offset().top;
      const menuBottom = $(element).height() + menuTop;
      if (scrollTop >= menuTop && scrollTop < menuBottom) {
        const $subMenu = $('.subMenu-item');
        $subMenu.removeClass('active');
        $($subMenu[index]).addClass('active');
        return false;
      }
    });
  }

  gotoSubMenu(subMenu: MenuSection): void {
    $('html, body').animate({scrollTop: $('#subMenu' + subMenu.id).offset().top - 56});
  }
}
