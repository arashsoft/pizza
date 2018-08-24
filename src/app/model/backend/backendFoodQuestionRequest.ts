import {BackendFoodAnswerRequest} from './backendFoodAnswerRequest';

export class BackendFoodQuestionRequest {
  id: number;
  answers?: BackendFoodAnswerRequest[];
}
