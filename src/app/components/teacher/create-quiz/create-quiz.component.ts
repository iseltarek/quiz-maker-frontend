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
    questions: [],
    is_published: false,
    startAt: new Date(),
  };
  today = new Date().toISOString().split('T')[0];
  datePart = this.today;
  timePart = '12:00';
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

  updateStartAt() {
    if (this.datePart && this.timePart) {
      const [year, month, day] = this.datePart.split('-').map(Number);
      const [hours, minutes] = this.timePart.split(':').map(Number);
      this.quiz.startAt = new Date(year, month - 1, day, hours, minutes);
    }
  }

  submitQuiz() {
    this.updateStartAt();
    const newQuiz = {
      title: this.quiz.title,
      description: this.quiz.description,
      duration: this.quiz.duration,
      questions: this.questions,
      is_published: true,
      startAt: this.quiz.startAt,
    };

    this.teacherService.createQuiz(newQuiz).subscribe({
      next: (quizResponse) => {
        this.quizStoreService.addTeacherQuiz(quizResponse);
        this.IsCreateQuiz.emit(false);
        this.questions = [];
        this.resetQuizForm();
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
      questions: [],
      is_published: false,
      startAt: new Date(),
    };
  }
}
