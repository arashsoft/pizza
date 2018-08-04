import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent {
  @Input() quantity: number;
  @Output() quantityChange = new EventEmitter<number>();

  increaseQuantity(): void {
    this.quantity++;
    this.quantityChange.emit(this.quantity);
  }

  reduceQuantity(): void {
    if (this.quantity === 1) {
      // TODO: handle removing items
      return;
    }
    this.quantity--;
    this.quantityChange.emit(this.quantity);
  }
}
