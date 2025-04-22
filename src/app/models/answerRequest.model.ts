import { QuestionType } from './question-type.enum';

export interface Answer {
  questionId: number;
  answer: string;
  questionType: QuestionType;
}
