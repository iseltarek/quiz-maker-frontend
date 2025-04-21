import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { QuizResponse } from '../models/quizResponse.model';
import { QuizRequest } from '../models/quizRequest.model';
import { QuestionRequest } from '../models/questionRequest.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  baseUrl = environment.apiUrl + '/teacher';
  authSerivce = inject(AuthService);
  teacherId = this.authSerivce.getUserId();
  constructor(public httpClient: HttpClient, public router: Router) {}

  public getTeacherQuizzes(): Observable<QuizResponse[]> {
    return this.httpClient.get<QuizResponse[]>(
      `${this.baseUrl}/${this.teacherId}/quiz`,
      {
        headers: this.getAuthHeader(),
      }
    );
  }

  public createQuiz(quizRequest: QuizRequest): Observable<QuizResponse> {
    return this.httpClient.post<QuizResponse>(
      `${this.baseUrl}/${this.teacherId}/quiz`,
      quizRequest,
      {
        headers: this.getAuthHeader(),
      }
    );
  }

  public createQuestion(
    question: QuestionRequest
  ): Observable<QuestionRequest> {
    return this.httpClient.post<QuestionRequest>(
      `${this.baseUrl}/${this.teacherId}/question`,
      question,
      {
        headers: this.getAuthHeader(),
      }
    );
  }

  public createManyQuestion(
    questions: QuestionRequest[]
  ): Observable<number[]> {
    if (!questions || questions.length === 0) {
      throw new Error('Questions array cannot be empty');
    }
    return this.httpClient.post<number[]>(
      `${this.baseUrl}/${this.teacherId}/question/bulk`,
      questions,
      {
        headers: this.getAuthHeader(),
      }
    );
  }

  private getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem(this.authSerivce.TOKEN_KEY);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
