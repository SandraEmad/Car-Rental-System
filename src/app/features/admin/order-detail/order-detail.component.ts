import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
;

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IOrder } from '../../../shared/models/iorder';
import { OrderService } from '../../../core/services/order.service';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [
    DatePipe, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, MatSelectModule, MatFormFieldModule
  ],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit {
  order: IOrder | null = null;
  loading = false;
  updating = false;

  paymentStatusControl = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;

    this.orderService.getOrderById(id).subscribe({
      next: (res) => {
        this.order = res.data ?? res;
        this.paymentStatusControl.setValue(this.order!.payment_status);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  updatePaymentStatus(): void {
    if (!this.order) return;
    this.updating = true;

    this.orderService.updateOrder(this.order.id, {
      payment_status: this.paymentStatusControl.value
    }).subscribe({
      next: () => {
        this.order!.payment_status = this.paymentStatusControl.value!;
        this.updating = false;
      },
      error: () => this.updating = false
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/orders']);
  }
}
