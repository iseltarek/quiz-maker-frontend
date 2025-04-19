export interface QuestionRequest {
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  correctAnswer: string;
}
export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  CHECKBOX = 'checkbox',
  TEXT = 'text',
}

export interface QuestionOption {
  id: string;
  text: string;
}
