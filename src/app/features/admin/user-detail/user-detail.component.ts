import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, UpperCasePipe } from '@angular/common';


import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserService } from '../../../core/services/user.service';
import { IUser } from '../../../shared/models/iuser';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    DatePipe, UpperCasePipe,
    MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
user: IUser | null = null; // ← null مش {}
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;

    this.userService.getUserById(id).subscribe({
      next: (res) => {
        this.user = res; // Assuming API response has a 'data' field containing the user
        console.log(this.user);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  goBack(): void {
    this.router.navigate(['/admin/users']);
  }
}
