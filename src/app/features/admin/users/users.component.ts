import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { UserService } from '../../../core/services/user.service';
import { IUser } from '../../../shared/models/iuser';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-users',
  imports: [CommonModule, ReactiveFormsModule, RouterModule,
    MatTableModule, MatInputModule, MatSelectModule,
    MatFormFieldModule, MatButtonModule, MatProgressSpinnerModule,
    MatChipsModule,MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: IUser[] = [];
  loading = false;

  // filters
  searchControl = new FormControl('');
  roleControl   = new FormControl('');
  countryControl = new FormControl('');

  displayedColumns = ['id', 'name', 'email', 'phone', 'country', 'role', 'actions'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();

    // Search مع debounce
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => this.loadUsers());

    this.roleControl.valueChanges.subscribe(() => this.loadUsers());
    this.countryControl.valueChanges.subscribe(() => this.loadUsers());
  }

  loadUsers(): void {
    this.loading = true;
    const filters = {
      search:  this.searchControl.value || '',
      role:    this.roleControl.value   || '',
      country: this.countryControl.value || '',
    };

    this.userService.getUsers(filters).subscribe({
      next: (res) => {
        this.users = res.data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}

