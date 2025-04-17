import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { AuthResponse } from '../model/auth-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + '/auth';

  readonly TOKEN_KEY = 'token';
  private isAuthenticatedUserSubject = new BehaviorSubject<boolean>(false);
  isAuthenticatedUserSubject$ = this.isAuthenticatedUserSubject.asObservable();

  constructor(public httpClient: HttpClient, public router: Router) {}

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.baseUrl}/login`, {
      email,
      password,
    });
  }
}
