import {BackendFoodAnswerRequest} from './backendFoodAnswerRequest';
import {FoodQuestion} from '../foodQuestion';

export class BackendFoodQuestionRequest {
  id: number;
  answers?: BackendFoodAnswerRequest[] = [];

  constructor(question: FoodQuestion) {
    this.id = question.id;
    question.answers.forEach(answer => {
      if (answer.selected || answer.quantity > 0) {
        this.answers.push(new BackendFoodAnswerRequest(answer, question.type));
      }
    });
  }
}
