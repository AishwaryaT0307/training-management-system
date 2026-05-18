
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './services/auth-service';


export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data?.['role'] as string | undefined;

  return auth.checkRole().pipe(
    map((resp: any) => {
      // if auth check failed -> go to login
      if (resp?.status !== 'success') {
        router.navigate(['/login']);
        return false;
      }

      const role = resp?.data?.role ?? null;

      // if route expects a specific role -> allow only that role
      if (requiredRole) {
        if (role === requiredRole) {
          return true;
        } else {
          router.navigate(['/home']);
          return false;
        }
      }

      return true;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
