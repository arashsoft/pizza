import {Component, OnInit} from '@angular/core';
import {CartService} from '../../service/cart.service';
import {OrderService} from '../../service/order-service';
import {Router} from '@angular/router';
import {Food} from '../../model/food';
import {PickupDeliveryComponent} from '../pickup-delivery/pickup-delivery.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditFoodComponent} from './edit-food/edit-food.component';

@Component({
  selector: 'app-page-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(public cartService: CartService,
              public orderService: OrderService,
              private modalService: NgbModal,
              private router: Router) {
  }

  ngOnInit() {
    if (this.orderService.isInitialized) {
      $('html, body').animate({scrollTop: 0}, 'fast');
    } else {
      // order page is not initialized, return to menu
      this.router.navigate(['./menus'], {queryParamsHandling: 'merge'});
    }
  }

  openFoodEditModal(food: Food) {
    const modalRef = this.modalService.open(EditFoodComponent, {windowClass: 'food-details-modal'});
    modalRef.componentInstance.food = food;
    modalRef.result.then((result) => {
      this.cartService.calculatePrice();
    }, (reason) => {
      this.cartService.calculatePrice();
    });
  }
}
