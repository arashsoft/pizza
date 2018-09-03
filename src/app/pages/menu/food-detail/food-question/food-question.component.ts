import {Component, OnInit} from '@angular/core';
import {Food} from '../../../../model/food';
import {FoodQuestion} from '../../../../model/foodQuestion';
import {Input} from '@angular/core';
import {FoodQuestionService} from '../../../../service/food-question-service';
import {FoodService} from '../../../../service/food-service';

@Component({
  selector: 'app-food-question',
  templateUrl: './food-question.component.html',
  styleUrls: ['./food-question.component.css']
})
export class FoodQuestionComponent implements OnInit {
  @Input() food: Food;
  @Input() question: FoodQuestion;

  constructor(public foodQuestionService: FoodQuestionService) {
  }

  ngOnInit() {
  }

  calculateFoodPrice(food: Food) {
    FoodService.calculateFoodPrice(food);
  }
}
