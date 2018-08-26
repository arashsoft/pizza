import {BackendFoodQuestionRequest} from './backendFoodQuestionRequest';
import {CartItem} from '../cartItem';

export class BackendFoodRequest {
  id: number;
  selectedSize?: number;
  specialInstruction?: string;
  quantity: number;
  questions?: BackendFoodQuestionRequest[] = [];

  constructor(cartItem: CartItem) {
    this.id = cartItem.food.id;
    this.selectedSize = cartItem.food.selectedSize ? cartItem.food.selectedSize.id : undefined;
    this.specialInstruction = '';
    this.quantity = cartItem.quantity;
    if (cartItem.food.selectedSize && cartItem.food.selectedSize.questions) {
      cartItem.food.selectedSize.questions.forEach(foodQuestion => {
        this.questions.push(new BackendFoodQuestionRequest(foodQuestion));
      });
    }
  }
}
