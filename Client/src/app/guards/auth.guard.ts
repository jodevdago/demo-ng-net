import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { catchError, map, of } from 'rxjs';
import { UserStore } from '../store/user.store';

export const AuthGuard = () => {
  const router = inject(Router);
  const store = inject(UserStore);
  const storage = inject(StorageService);

  const token = storage.getItem('jwt');

  if (!token) {
    router.navigate(['/login']);
    return of(false);
  }

  return store.loadProfile().pipe(
    map((isAuth) => {
      if (isAuth) {
        return true;
      } else {
        router.navigate(['/unauthorized']);
        return false;
      }
    }),
    catchError(() => {
      router.navigate(['/unauthorized']);
      return of(false);
    })
  )

  const user = store.userConnected;
  console.log('[user]: ', user());
  if (user().auth) {
    return of(true);
  }
  console.log('[user] auth false');
  router.navigate(['/unauthorized']);
  return of(false);
};
