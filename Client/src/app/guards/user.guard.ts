import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

export const userGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.userConnected$.pipe(
    take(1),
    map((user) => {
      if (user?.role === 'Admin') {
        return true;
      } else {
        router.navigate(['/layout']);
        return false;
      }
    })
  );
};

