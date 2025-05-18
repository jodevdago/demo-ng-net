import { DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from '../services/storage.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const AuthGuard = () => {
  const destroyRef = inject(DestroyRef);
  const router = inject(Router);
  const userService = inject(UserService);
  const storage = inject(StorageService);

  const token = storage.getItem('jwt');

  if (!token) {
    router.navigate(['/login']);
    return of(false);
  }

  return userService.getProfile().pipe(
    takeUntilDestroyed(destroyRef),
    map((user) => {
      if (user && user.auth) {
        userService.userConnected$.next(user);
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    }),
    catchError((err) => {
      router.navigate(['/unauthorized']);
      return of(false);
    })
  );
};
