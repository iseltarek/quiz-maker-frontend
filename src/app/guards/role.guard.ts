import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authSerivce = inject(AuthService);
  const isTeacher = authSerivce.getUserRole();
  if (isTeacher !== 'teacher') {
    console.log(isTeacher);
    router.navigate(['/']);
    return false;
  }
  return true;
};
