# 🚗 Car Rental System

## Tech Stack
- **Angular 19** (Standalone Components)
- **Angular Material 19**
- **TypeScript**
- **RxJS**

## Setup
```bash
npm install
ng serve
```
Open your browser and navigate to `http://localhost:4200/`

## Test Accounts
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@admin.com | password |
| Customer | customer@customer.com | password |

## Project Structure
src/app/
├── core/
│   ├── services/       # AuthService, CarService, UserService, OrderService
│   ├── interceptors/   # headerInterceptor (Bearer Token), errorInterceptor
│   └── guards/         # authGuard, adminGuard, customerGuard
├── shared/
│   └── models/         # IUser, ICar, IOrder
├── features/
│   ├── auth/           # Login, Register
│   ├── admin/          # Users, Cars, Orders + Details
│   └── customer/       # Cars, Orders, Installments
└── layout/
├── admin-layout/   # Admin Sidebar + Router Outlet
└── customer-layout/ # Customer Sidebar + Router Outlet
## Features
### Admin Dashboard
- ✅ Users Management (Read Only)
- ✅ Cars Management (Full CRUD)
- ✅ Orders Management (View + Update Payment Status)

### Customer
- ✅ Browse Cars
- ✅ Car Details + Create Order
- ✅ My Orders
- ✅ Installments

## Dark Mode
Click the 🌙 icon in the sidebar to toggle dark mode

## API
- Base URL: `https://task.abudiyab-soft.com/api`
- Authentication: Bearer Token (handled automatically via interceptor)
- 
