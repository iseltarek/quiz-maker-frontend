import { Component, effect, inject, signal } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { QuizResponse } from '../../models/quizResponse.model';
import { QuizStoreService } from '../../services/quiz.store.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { SharedMaterialModule } from '../../modules/shared-material.module';

@Component({
  selector: 'app-teacher',
  imports: [CommonModule, CreateQuizComponent, SharedMaterialModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css',
})
export class TeacherComponent {
  quizzes: QuizResponse[] = [];
  private quizzesStoreService = inject(QuizStoreService);
  private authnticationService = inject(AuthService);
  IsCreateQuiz = signal<boolean>(false);

  constructor(private teacherService: TeacherService) {
    this.teacherService.getTeacherQuizzes().subscribe({
      next: (quiz) => {
        this.quizzes = quiz;
        this.quizzesStoreService.setTeacherQuizzes(quiz);
      },
    });
    effect(() => {
      this.quizzes = this.quizzesStoreService.teacherQuizzes();
    });
  }

  ngOnInit() {
    this.authnticationService.isAuthenticatedUserSubject$.subscribe({
      next: (isAuthenticated) => {
        if (!isAuthenticated) {
          this.quizzesStoreService.resetTeacherQuizzes();
          this.IsCreateQuiz.set(false);
        }
      },
    });
  }

  createQuiz() {
    this.IsCreateQuiz.set(true);
  }

  // deleteQuiz(quizId: number) {
  //   this.teacherService.deleteQuiz(quizId).subscribe({
  //     next: () => {
  //       this.quizzesStoreService.deleteTeacherQuiz(quizId);
  //     },
  //   });
  // }
}
