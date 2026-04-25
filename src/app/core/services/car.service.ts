import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarService {
  private readonly baseUrl = 'https://task.abudiyab-soft.com/api/admin/cars';

  constructor(private http: HttpClient) {}

  getCars(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    if (filters.search) params = params.set('search', filters.search);
    if (filters.brand) params = params.set('brand', filters.brand);
    if (filters.min_price) params = params.set('min_price', filters.min_price);
    if (filters.max_price) params = params.set('max_price', filters.max_price);
    if (filters.per_page) params = params.set('per_page', filters.per_page);
    return this.http.get(this.baseUrl, { params });
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCar(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  updateCar(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
