import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authSerivce = inject(AuthService);
  const isLoggedIn = authSerivce.isUserAuthenticated();
  if (!isLoggedIn) {
    router.navigate(['']);
    return false;
  }
  return true;
};
