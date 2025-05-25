import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  role: string;
  username: string;
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

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<ApiResponse<LoginResponse>>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => response.metaData),
        catchError(this.handleError)
      );
  }

  logout(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/logout`, { userId }, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return localStorage.getItem('role');
  }

  getDefaultRoute(): string {
    const role = this.getRole();
    switch(role) {
      case 'ADMIN':
        return '/module-view-admin';
      case 'FACULTY':
        return '/module-view-fa';
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
