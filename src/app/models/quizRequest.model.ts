import { QuestionRequest } from './questionRequest.model';

export interface QuizRequest {
  title: string;
  duration: number;
  description?: string;
  questions: QuestionRequest[];
  is_published: boolean;
}
