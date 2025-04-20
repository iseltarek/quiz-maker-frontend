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
import { AuthResponse } from '../models/auth-response.model';
import { User } from '../models/user.data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + '/auth';

  readonly TOKEN_KEY = 'token';
  readonly USER_DATA_KEY = 'userData';
  private isAuthenticatedUserSubject = new BehaviorSubject<boolean>(false);
  isAuthenticatedUserSubject$ = this.isAuthenticatedUserSubject.asObservable();

  constructor(public httpClient: HttpClient, public router: Router) {}

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(`${this.baseUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((user) => {
          if (user) {
            localStorage.setItem(this.TOKEN_KEY, user.verificationToken);
            localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(user.user));
            this.isAuthenticatedUserSubject.next(true);
          }
        })
      );
  }
  public register(user: User): Observable<User> {
    const body = {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    };
    return this.httpClient.post<User>(`${this.baseUrl}/register`, body);
  }

  public logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_DATA_KEY);
    this.isAuthenticatedUserSubject.next(false);
  }
  public isUserAuthenticated(): boolean {
    return (
      this.isAuthenticatedUserSubject.value ||
      !!localStorage.getItem(this.TOKEN_KEY)
    );
  }
  public getUserId(): number | null {
    const userString = localStorage.getItem(this.USER_DATA_KEY);
    if (!userString) return null;
    const user = JSON.parse(userString);
    return user.id;
  }
}
