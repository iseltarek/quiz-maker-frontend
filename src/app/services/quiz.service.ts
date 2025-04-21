import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroment';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizResponse } from '../models/quizResponse.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  baseUrl = environment.apiUrl;
  authSerivce = inject(AuthService);
  userId = this.authSerivce.getUserId();
  constructor(public httpClient: HttpClient, public router: Router) {}

  public getAllQuizzes(): Observable<QuizResponse[]> {
    console.log(this.userId);
    return this.httpClient.get<QuizResponse[]>(
      `${this.baseUrl}/student/${this.userId}/quiz`,
      {
        headers: this.getAuthHeader(),
      }
    );
  }

  public getQuiz(quizId: number): Observable<QuizResponse> {
    return this.httpClient.get<QuizResponse>(`${this.baseUrl}/quiz/${quizId}`, {
      headers: this.getAuthHeader(),
    });
  }

  private getAuthHeader(): HttpHeaders {
    const token = localStorage.getItem(this.authSerivce.TOKEN_KEY);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
