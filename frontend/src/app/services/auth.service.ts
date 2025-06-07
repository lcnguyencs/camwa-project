import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  role: string;
  username: string;
  acc_id: string;
}

interface UserInfo {
  acc_id: string;
  username: string;
  email: string;
  role: string;
}

interface ApiResponse<T> {
  status: string;
  code: number;
  message: string;
  metaData: T;
  doc: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => response.metaData),
        catchError(this.handleError)
      );
  }

  logout(userId: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/logout`, { userId }, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getCurrentUser(): Observable<UserInfo> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ApiResponse<UserInfo>>(`${this.apiUrl}/me`, { headers })
      .pipe(
        map(response => response.metaData),
        catchError(this.handleError)
      );
  }

  getRole(): string | null {
    const decodedToken = this.tokenService.getDecodedToken();
    return decodedToken?.role || null;
  }

  getDefaultRoute(): string {
    const role = this.getRole();
    switch (role) {
      case 'ADMIN':
        return '/account-view-admin';
      case 'FACULTY':
        return '/module-view-faculty';
      case 'ACADEMIC':
        return '/module-view-ac';
      case 'LECTURER':
        return '/module-view-lecturer';
      case 'STUDENT':
        return '/module-view-student';
      default:
        return '/login';
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('Auth Service Error:', errorMessage);
    return throwError(() => error);
  }
}
