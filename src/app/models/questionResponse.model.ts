import { QuestionType } from './question-type.enum';

export interface QuestionResponse {
  id: number;
  text: string;
  type: QuestionType;
  options: QuestionOption[] | null;
}

export interface QuestionOption {
  is_correct: boolean;
  text: string;
}
export { QuestionType };
