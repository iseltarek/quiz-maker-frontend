import { Component, inject } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { QuizResponse } from '../../models/quizResponse.model';
import { QuizStoreService } from '../../services/quiz.store.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-teacher',
  imports: [CommonModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css',
})
export class TeacherComponent {
  quizzes: QuizResponse[] = [];
  private quizzesStoreService = inject(QuizStoreService);
  private authnticationService = inject(AuthService);

  constructor(private teacherService: TeacherService) {
    this.teacherService.getTeacherQuizzes().subscribe({
      next: (quiz) => {
        this.quizzes = quiz;
        this.quizzesStoreService.setQuizzes(quiz);
      },
    });
  }

  ngOnInit() {
    this.authnticationService.isAuthenticatedUserSubject$.subscribe({
      next: (isAuthenticated) => {
        if (!isAuthenticated) {
          this.quizzesStoreService.resetQuizzes();
        }
      },
    });
  }

  createQuiz() {}
}
