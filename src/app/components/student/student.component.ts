import { Component, effect, inject, Input, signal } from '@angular/core';
import { QuizCardComponent } from './quizCard/quizCard.component';
import { CommonModule } from '@angular/common';
import { QuizResponse } from '../../models/quizResponse.model';
import { AuthService } from '../../services/auth.service';
import { QuizStoreService } from '../../services/quiz.store.service';
import { QuizService } from '../../services/quiz.service';
import { QuizComponent } from './quiz/quiz.component';

@Component({
  selector: 'app-student',
  imports: [QuizCardComponent, CommonModule, QuizComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  quizId!: number;
  allQuizzes = signal<QuizResponse[]>([]);
  private quizzesStoreService = inject(QuizStoreService);
  private authnticationService = inject(AuthService);
  private quizService = inject(QuizService);
  isQuizOpen = signal<boolean>(false);
  constructor() {
    this.quizService.getAllQuizzes().subscribe({
      next: (quizzes) => {
        this.allQuizzes.set(quizzes);
        this.quizzesStoreService.setAllQuizzes(quizzes);
      },
    });
    effect(() => {
      this.allQuizzes.set(this.quizzesStoreService.allQuizzes());
    });
  }
  handleQuizOpen(open: boolean) {
    console.log('in student', this.quizId);
    this.isQuizOpen.set(open);
  }
  handleQuizSelected(id: number) {
    this.quizId = id;
  }
}
