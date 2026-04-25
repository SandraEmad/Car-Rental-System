import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';


import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IOrder } from '../../../shared/models/iorder';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    ReactiveFormsModule, DatePipe,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatProgressSpinnerModule, MatTooltipModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: IOrder[] = [];
  loading = false;


displayedColumns = ['id', 'user', 'car', 'order_type', 'payment_type', 'payment_status', 'total_price', 'delivery_date', 'receiving_date', 'actions'];
  // Filters
  searchControl        = new FormControl('');
  paymentTypeControl   = new FormControl('');
  paymentStatusControl = new FormControl('');
  orderTypeControl     = new FormControl('');

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();

    this.searchControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => this.loadOrders());
    this.paymentTypeControl.valueChanges.subscribe(() => this.loadOrders());
    this.paymentStatusControl.valueChanges.subscribe(() => this.loadOrders());
    this.orderTypeControl.valueChanges.subscribe(() => this.loadOrders());
  }

  loadOrders(): void {
    this.loading = true;
    const filters = {
      search:         this.searchControl.value        || '',
      payment_type:   this.paymentTypeControl.value   || '',
      payment_status: this.paymentStatusControl.value || '',
      order_type:     this.orderTypeControl.value     || '',
    };

    this.orderService.getOrders(filters).subscribe({
      next: (res) => { this.orders = res.data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  viewDetail(id: number): void {
    this.router.navigate(['/admin/orders', id]);
  }
}
