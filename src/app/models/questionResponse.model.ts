export interface QuestionResponse {
  id: number;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
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
