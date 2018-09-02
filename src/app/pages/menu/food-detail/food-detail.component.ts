import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Food} from '../../../model/food';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CartService} from '../../../service/cart.service';
import * as _ from 'lodash';
import {FoodSize} from '../../../model/foodSize';
import {OrderService} from '../../../service/order-service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  @Input() food: Food;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private cartService: CartService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.food.calculatePrice();
  }

  openDetails(foodDetailTemplate): void {
    this.food.reset();
    this.food.calculatePrice();
    this.modalService.open(foodDetailTemplate, {windowClass: 'food-details-modal'});
  }

  addFoodToCart(): void {
    this.cartService.addFood(_.cloneDeep(this.food));
    this.orderService.saveOrderHistory();
  }

  selectSize(foodSize: FoodSize): void {
    this.food.selectedSize = foodSize;
    this.food.calculatePrice();
  }
}
