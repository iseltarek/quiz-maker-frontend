export interface QuizError {
  message: string;
  score: number;
  passed: boolean;
  submittedAt: Date;
  numberOfQuestions: number;
}
