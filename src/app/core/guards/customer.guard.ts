import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const customerGuard: CanActivateFn = (route, state) => {
 const auth = inject(AuthService);
  const router = inject(Router);
  if (auth.getRole() === 'customer') return true;
  router.navigate(['/login']);
  return false;
};
