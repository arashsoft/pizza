import { Component, OnInit, Input } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Food} from '../../../model/food';
import {CartService} from '../../../service/cart.service';
import {FoodService} from '../../../service/food-service';
import {FoodSize} from '../../../model/foodSize';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['./edit-food.component.css']
})
export class EditFoodComponent implements OnInit {
  @Input() food: Food;

  constructor(public activeModal: NgbActiveModal, cartService: CartService) { }

  ngOnInit() {
  }

  selectSize(foodSize: FoodSize): void {
    this.food.selectedSize = foodSize;
    FoodService.calculateFoodPrice(this.food);
  }

}
