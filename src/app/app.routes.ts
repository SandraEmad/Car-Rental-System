import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { customerGuard } from './core/guards/customer.guard';
import { NotfoundComponent } from './features/notfound/notfound.component';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'register',
    title: 'Register',
    loadComponent: () =>
      import('./features/auth/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'admin',
    title: 'Admin Dashboard',
    canActivate: [authGuard, adminGuard],
    loadComponent: () =>
      import('./layout/admin-layout/admin-layout/admin-layout.component').then(
        (m) => m.AdminLayoutComponent,
      ),
    children: [
      {
        path: 'users',
        title: 'Users Management',
        loadComponent: () =>
          import('./features/admin/users/users.component').then(
            (m) => m.UsersComponent,
          ),
      },
      {
        path: 'users/:id',
        title: 'User Details',
        loadComponent: () =>
          import('./features/admin/user-detail/user-detail.component').then(
            (m) => m.UserDetailComponent,
          ),
      },
      {
        path: 'cars',
        title: 'Cars Management',
        loadComponent: () =>
          import('./features/admin/cars/cars.component').then(
            (m) => m.CarsComponent,
          ),
      },
      {
        path: 'orders',
        title: 'Orders Management',
        loadComponent: () =>
          import('./features/admin/orders/orders.component').then(
            (m) => m.OrdersComponent,
          ),
      },
      {
        path: 'orders/:id',
        title: 'Order Details',
        loadComponent: () =>
          import('./features/admin/order-detail/order-detail.component').then(
            (m) => m.OrderDetailComponent,
          ),
      },
      { path: '', redirectTo: 'cars', pathMatch: 'full' },
    ],
  },
  {
    path: 'cars',
    title: 'Browse Cars',
    canActivate: [authGuard, customerGuard],
    loadComponent: () =>
      import('./layout/customer-layout/customer-layout/customer-layout.component').then(
        (m) => m.CustomerLayoutComponent,
      ),
    children: [
      {
        path: '',
        title: 'All Cars',
        loadComponent: () =>
          import('./features/customer/cars/cars.component').then(
            (m) => m.CarsComponent,
          ),
      },
      {
        path: ':id',
        title: 'Car Details',
        loadComponent: () =>
          import('./features/customer/car-detail/car-detail.component').then(
            (m) => m.CarDetailComponent,
          ),
      },
    ],
  },
  {
    path: 'orders',
    title: 'My Orders',
    canActivate: [authGuard, customerGuard],
    loadComponent: () =>
      import('./layout/customer-layout/customer-layout/customer-layout.component').then(
        (m) => m.CustomerLayoutComponent,
      ),
    children: [
      {
        path: '',
        title: 'Orders List',
        loadComponent: () =>
          import('./features/customer/orders/orders.component').then(
            (m) => m.OrdersComponent,
          ),
      },
      {
        path: ':id',
        title: 'Order Details',
        loadComponent: () =>
          import('./features/customer/order-detail/order-detail.component').then(
            (m) => m.OrderDetailComponent,
          ),
      },
    ],
  },
  {
    path: 'installments',
    title: 'My Installments',
    canActivate: [authGuard, customerGuard],
    loadComponent: () =>
      import('./layout/customer-layout/customer-layout/customer-layout.component').then(
        (m) => m.CustomerLayoutComponent,
      ),
    children: [
      {
        path: '',
        title: 'Installments',
        loadComponent: () =>
          import('./features/customer/installments/installments.component').then(
            (m) => m.InstallmentsComponent,
          ),
      },
    ],
  },

  {
    path: 'orders',
    title: 'My Orders',
    canActivate: [authGuard, customerGuard],
    loadComponent: () =>
      import('./features/customer/orders/orders.component').then(
        (m) => m.OrdersComponent,
      ),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', title: 'Not Found', component: NotfoundComponent },
];
