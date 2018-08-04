import {Component, OnInit} from '@angular/core';
import {CartService} from '../../service/cart.service';

@Component({
  selector: 'app-page-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cartService: CartService) {
  }

  ngOnInit() {
  }

}
