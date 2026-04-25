import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly baseUrl = 'https://task.abudiyab-soft.com/api/admin/orders';

  constructor(private http: HttpClient) {}

  getOrders(filters: any = {}): Observable<any> {
    let params = new HttpParams();
    if (filters.search)         params = params.set('search', filters.search);
    if (filters.user_id)        params = params.set('user_id', filters.user_id);
    if (filters.car_id)         params = params.set('car_id', filters.car_id);
    if (filters.payment_type)   params = params.set('payment_type', filters.payment_type);
    if (filters.payment_status) params = params.set('payment_status', filters.payment_status);
    if (filters.order_type)     params = params.set('order_type', filters.order_type);
    if (filters.per_page)       params = params.set('per_page', filters.per_page);
    return this.http.get(this.baseUrl, { params });
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateOrder(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
