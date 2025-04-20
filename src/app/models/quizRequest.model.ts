export interface QuizRequest {
  title: string;
  duration: number;
  description?: string;
  questionsIds: number[];
  is_published: boolean;
}
