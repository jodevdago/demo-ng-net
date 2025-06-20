import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../types/user.type';
import { inject, DestroyRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { map, Observable, tap } from 'rxjs';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState({
    userConnected: {} as User,
  }),
  withMethods((store, userService = inject(UserService), destroyRef = inject(DestroyRef)) => ({
    loadProfile(): Observable<boolean> {
      return userService.getProfile().pipe(
        tap((user) => {
          patchState(store, { userConnected: user });
        }),
        map((user) => user.auth),
        takeUntilDestroyed(destroyRef),
      );
    },
  })),
);
