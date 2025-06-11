import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserStore } from '../store/user.store';
import { of } from 'rxjs/internal/observable/of';

export const userGuard = () => {
  const store = inject(UserStore);
  const router = inject(Router);

  const user = store.userConnected;
  if (user().role === 'Admin') {
    return of(true);
  } else {
    router.navigate(['/layout']);
    return of(false);
  }
};
