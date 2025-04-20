import { Injectable, signal } from '@angular/core';
import { QuizResponse } from '../models/quizResponse.model';

@Injectable({
  providedIn: 'root',
})
export class QuizStoreService {
  private _quizzes = signal<QuizResponse[]>([]);
  quizzes = this._quizzes.asReadonly();

  public setQuizzes(quizzes: QuizResponse[]): void {
    this._quizzes.set(quizzes);
  }
  public addQuiz(quiz: QuizResponse) {
    this._quizzes.update((quizz) => [...quizz, quiz]);
  }

  public resetQuizzes() {
    this._quizzes.set([]);
  }
}
