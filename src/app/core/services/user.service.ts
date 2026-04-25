import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = 'https://task.abudiyab-soft.com/api/admin';

  constructor(private http: HttpClient) {}

  getUsers(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    if (filters.search)   params = params.set('search', filters.search);
    if (filters.role)     params = params.set('role', filters.role);
    if (filters.country)  params = params.set('country', filters.country);
    if (filters.per_page) params = params.set('per_page', filters.per_page);

    return this.http.get(`${this.baseUrl}/users`, { params });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }
}
