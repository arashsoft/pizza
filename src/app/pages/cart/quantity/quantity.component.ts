import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RemoveItemModalComponent} from './remove-item-modal/remove-item-modal.component';
import {CartService} from '../../../service/cart.service';
import {CartItem} from '../../../model/cartItem';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent {
  @Input() item: CartItem;
  @Input() index: number;
  @Output() quantityChange = new EventEmitter<number>();

  constructor(private modalService: NgbModal, private cartService: CartService) {
  }

  increaseQuantity(): void {
    this.item.quantity++;
    this.quantityChange.emit(this.item.quantity);
  }

  reduceQuantity(): void {
    if (this.item.quantity === 1) {
      const modalRef = this.modalService.open(RemoveItemModalComponent, {centered: true});
      modalRef.componentInstance.foodName = this.item.food.name;
      modalRef.result.then(() => {
        this.cartService.removeFoodByIndex(this.index);
      });
      return;
    }
    this.item.quantity--;
    this.quantityChange.emit(this.item.quantity);
  }
}
