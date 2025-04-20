import { QuestionType } from './questionResponse.model';

export interface QuestionRequest {
  text: string;
  type: QuestionType;
  options: QuestionOption[] | null;
  correctAnswer: string;
}

export interface QuestionOption {
  is_correct: boolean;
  text: string;
}
