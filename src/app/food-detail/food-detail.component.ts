import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Food} from '../model/food';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {CartService} from '../cart/cart.service';


@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit {
  @Input() food: Food;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.food.calculatePrice();
  }

  openDetails(foodDetailTemplate): void {
    this.modalService.open(foodDetailTemplate, {  });
  }
}
