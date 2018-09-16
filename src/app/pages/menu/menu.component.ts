import {Component, OnInit} from '@angular/core';
import {Menu} from '../../model/menu';
import {FoodProviderService} from '../../service/food-provider-service';
import {OrderService} from '../../service/order-service';
import * as $ from 'jquery';
import {MenuSection} from '../../model/menuSection';
import {DeliveryType} from '../../model/foodProvider';
import * as _ from 'lodash';

@Component({
  selector: 'app-page-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Menu[];
  subMenuMap = {};
  mobileMenu = false;
  previousActiveSubMenuIndex = -1;

  constructor(private foodProviderService: FoodProviderService, public orderService: OrderService) {
  }

  ngOnInit() {
    this.mobileMenu = false;
    this.orderService.initialize();
    this.foodProviderService.getFoodProvider().subscribe(data => {
      this.menus = data.menus;
    });

    $(window).on('scroll', _.throttle(this.updatePosition, 200));
  }

  updatePosition(): void {
    const scrollTop = $(window).scrollTop();
    $('.sub-menu-section-container').each((index, element) => {
      const menuTop = $(element).offset().top - 50;
      const menuBottom = $(element).height() + menuTop;
      if (scrollTop >= menuTop && scrollTop < menuBottom) {
        if (this.previousActiveSubMenuIndex !== index) {
          this.previousActiveSubMenuIndex = index;
          const $subMenu = $('.subMenu-item');
          $subMenu.removeClass('active');
          $($subMenu[index]).addClass('active');
          return false;
        }
      }
    });
  }

  public gotoSubMenu(subMenu: MenuSection, isMobile ?: boolean, event?: Event): void {
    $([document.documentElement, document.body])
      .animate({scrollTop: $('#subMenu' + subMenu.id).offset().top - (isMobile ? 0 : 56)}, () => {
        if (!isMobile) {
          const $subMenu = $('.subMenu-item');
          $subMenu.removeClass('active');
          $(event.target).addClass('active');
          this.previousActiveSubMenuIndex = -1;
        }
      });
  }

  isSubMenuVisible(subMenu: MenuSection): boolean {
    const order = this.orderService.order;
    return subMenu.deliveryType === DeliveryType.BOTH ||
      (subMenu.deliveryType === DeliveryType.PICKUP_ONLY && order.isPickup) ||
      (subMenu.deliveryType === DeliveryType.DELIVERY_ONLY && !order.isPickup);
  }
}
