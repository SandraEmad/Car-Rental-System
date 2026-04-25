import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'https://task.abudiyab-soft.com/api';
  constructor(private readonly httpClient: HttpClient) {}

  loginAdmin(data: object): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/admin/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token); 
        localStorage.setItem('role', res.user.role);
      }),
    );
  }

  loginCustomer(data: object): Observable<any> {
    return this.httpClient
      .post<any>(`${this.baseUrl}/customer/login`, data)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('role', res.user.role);
        }),
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getRole() {
    return localStorage.getItem('role');
  }
  isLoggedIn() {
    return !!this.getToken();
  }
}
