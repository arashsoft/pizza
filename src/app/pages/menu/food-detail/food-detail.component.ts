import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Food} from '../../../model/food';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {CartService} from '../../../service/cart.service';
import * as _ from 'lodash';
import {FoodSize} from '../../../model/foodSize';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  @Input() food: Food;

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.food.calculatePrice();
  }

  openDetails(foodDetailTemplate): void {
    this.food.reset();
    this.food.calculatePrice();
    this.modalService.open(foodDetailTemplate, {});
  }

  addFoodToCart(): void {
    this.cartService.addFood(_.cloneDeep(this.food));
  }

  selectSize(foodSize: FoodSize): void {
    this.food.selectedSize = foodSize;
    this.food.calculatePrice();
  }
}
