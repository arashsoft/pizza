import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Food} from '../../../model/food';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CartService} from '../../../service/cart.service';
import * as _ from 'lodash';
import {FoodSize} from '../../../model/foodSize';
import {OrderService} from '../../../service/order-service';
import {FoodService} from '../../../service/food-service';
import {Toast, ToastService, ToastType} from '../../../service/toast-service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  @Input() food: Food;

  modalRef: NgbModalRef;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private toastService: ToastService,
              private cartService: CartService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    FoodService.calculateFoodPrice(this.food);
  }

  openDetails(foodDetailTemplate): void {
    FoodService.resetFood(this.food);
    FoodService.calculateFoodPrice(this.food);
    this.modalRef = this.modalService.open(foodDetailTemplate, {windowClass: 'food-details-modal'});
  }

  addFoodToCart(): void {
    FoodService.calculateFoodPrice(this.food);
    const errorMessage = FoodService.checkIfFoodCanBeAddedToCart(this.food);
    if (errorMessage) {
      this.toastService.setToast(new Toast(errorMessage, ToastType.ERROR));
    } else {
      this.cartService.addFood(_.cloneDeep(this.food));
      this.orderService.saveOrderHistory();
      this.modalRef.close();
      this.toastService.setToast(new Toast(this.food.name + ' is added to your cart!', ToastType.NORMAL));
    }
  }

  selectSize(foodSize: FoodSize): void {
    this.food.selectedSize = foodSize;
    FoodService.calculateFoodPrice(this.food);
  }
}
