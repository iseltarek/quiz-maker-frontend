import { QuestionResponse } from './questionResponse.model';

export interface QuizResponse {
  id: number;
  title: string;
  duration: number;
  describtion?: string;
  createdAt: Date;
  isPublished: boolean;
  deletedAt: Date;
}
