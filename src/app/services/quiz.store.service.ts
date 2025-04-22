import { Injectable, signal } from '@angular/core';
import { QuizResponse } from '../models/quizResponse.model';

@Injectable({
  providedIn: 'root',
})
export class QuizStoreService {
  private _teacherQuizzes = signal<QuizResponse[]>([]);
  teacherQuizzes = this._teacherQuizzes.asReadonly();
  private _allQuizzes = signal<QuizResponse[]>([]);
  allQuizzes = this._allQuizzes.asReadonly();

  public setTeacherQuizzes(quizzes: QuizResponse[]): void {
    this._teacherQuizzes.set(quizzes);
  }
  public addTeacherQuiz(quiz: QuizResponse) {
    this._teacherQuizzes.update((quizz) => [...quizz, quiz]);
  }
  public deleteTeacherQuiz(quizId: number) {
    this._teacherQuizzes.update((quizzes) =>
      quizzes.filter((quiz) => quiz.id !== quizId)
    );
  }
  public resetTeacherQuizzes() {
    this._teacherQuizzes.set([]);
  }

  public setAllQuizzes(quizzes: QuizResponse[]): void {
    this._allQuizzes.set(quizzes);
  }

  public resetAllQuizzes() {
    this._allQuizzes.set([]);
  }
}
