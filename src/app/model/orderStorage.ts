import {Order} from './order';

export class OrderStorage {
  timestamp: number;
  order: Order;

  constructor(timestamp: number, order: Order) {
    this.timestamp = timestamp;
    this.order = order;
  }
}
