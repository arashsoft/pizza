import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RemoveItemModalComponent} from './remove-item-modal/remove-item-modal.component';
import {CartService} from '../../../service/cart.service';
import {CartItem} from '../../../model/cartItem';
import {OrderService} from '../../../service/order-service';
import {Toast, ToastService, ToastType} from '../../../service/toast-service';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent {
  @Input() item: CartItem;
  @Input() index: number;
  @Output() quantityChange = new EventEmitter<number>();

  constructor(private modalService: NgbModal,
              private toastService: ToastService,
              private cartService: CartService,
              private orderService: OrderService) {
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
        this.orderService.saveOrderHistory();
        this.toastService.setToast(new Toast(this.item.food.name + ' is removed to your cart!', ToastType.NORMAL));
      });
      return;
    }
    this.item.quantity--;
    this.quantityChange.emit(this.item.quantity);
  }
}
