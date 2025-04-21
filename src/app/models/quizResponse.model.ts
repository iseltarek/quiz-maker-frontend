import { QuestionResponse } from './questionResponse.model';

export interface QuizResponse {
  id: number;
  title: string;
  duration: number;
  description?: string;
  createdAt: Date;
  isPublished: boolean;
  deletedAt: Date;
  createdBy?: {
    id: number;
    username: string;
  };
  questions?: QuestionResponse[];
}
