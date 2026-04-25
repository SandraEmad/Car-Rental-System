import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  errorMsg = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}


submitLoginForm(): void {
  this.authService.loginAdmin(this.loginForm.value).subscribe({
    next: (res) => {
      this.toastrService.success('Account created successfully');
      this.router.navigate(['/admin/cars']);
    },
    error: () => {
      this.authService.loginCustomer(this.loginForm.value).subscribe({
        next: () => this.router.navigate(['/cars']),
        error: () => this.errorMsg = 'Invalid credentials'
      });
    }
  });
}
}
