import { Component, effect, inject, signal } from '@angular/core';
import { QuizComponent } from '../quiz/quiz.component';
import { CommonModule } from '@angular/common';
import { QuizResponse } from '../../models/quizResponse.model';
import { AuthService } from '../../services/auth.service';
import { QuizStoreService } from '../../services/quiz.store.service';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-student',
  imports: [QuizComponent, CommonModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  allQuizzes = signal<QuizResponse[]>([]);
  private quizzesStoreService = inject(QuizStoreService);
  private authnticationService = inject(AuthService);
  private quizService = inject(QuizService);

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
}
