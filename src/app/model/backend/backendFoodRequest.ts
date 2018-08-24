import {BackendFoodQuestionRequest} from './backendFoodQuestionRequest';

export class BackendFoodRequest {
  id: number;
  selectedSize?: number;
  specialInstruction?: string;
  quantity: number;
  questions?: BackendFoodQuestionRequest[];
}
