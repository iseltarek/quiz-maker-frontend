import {
  Component,
  EventEmitter,
  Input,
  Output,
  Signal,
  signal,
} from '@angular/core';
import { SharedMaterialModule } from '../../../modules/shared-material.module';
import { CommonModule } from '@angular/common';
import { QuestionRequest } from '../../../models/questionRequest.model';
import { QuizRequest } from '../../../models/quizRequest.model';
import { QuestionType } from '../../../models/question-type.enum';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../../services/teacher.service';
import { QuizStoreService } from '../../../services/quiz.store.service';

@Component({
  selector: 'app-create-quiz',
  imports: [SharedMaterialModule, CommonModule, FormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css',
})
export class CreateQuizComponent {
  currentQuestionType: QuestionType = QuestionType.MULTIPLE_CHOICE;
  questions: QuestionRequest[] = [];
  quiz: QuizRequest = {
    title: '',
    description: '',
    duration: 0,
    questionsIds: [],
    is_published: false,
  };
  errorMessage = signal<string>('');
  @Output() IsCreateQuiz = new EventEmitter<boolean>();
  constructor(
    private teacherService: TeacherService,
    private quizStoreService: QuizStoreService
  ) {}

  addOption(question: QuestionRequest) {
    question.options ??= [];
    question.options.push({
      text: '',
      is_correct: false,
    });
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  addQuestion() {
    const newQuestion: QuestionRequest = {
      type: this.currentQuestionType,
      text: '',
      options:
        this.currentQuestionType === QuestionType.MULTIPLE_CHOICE
          ? [{ text: '', is_correct: true }]
          : null,
      correctAnswer: '',
    };
    this.questions.push(newQuestion);
  }

  submitQuiz() {
    this.teacherService.createManyQuestion(this.questions).subscribe({
      next: (questionIds) => {
        const newQuiz = {
          title: this.quiz.title,
          description: this.quiz.description,
          duration: this.quiz.duration,
          questionsIds: questionIds,
          is_published: true,
        };
        this.teacherService.createQuiz(newQuiz).subscribe({
          next: (quizResponse) => {
            this.quizStoreService.addQuiz(quizResponse);
            this.IsCreateQuiz.emit(false);
            this.questions = [];
            this.resetQuizForm();
          },
        });
      },
      error: (err) => this.errorMessage.set(err.error.message),
    });
  }

  private resetQuizForm() {
    this.questions = [];
    this.quiz = {
      title: '',
      description: '',
      duration: 0,
      questionsIds: [],
      is_published: false,
    };
  }
}
