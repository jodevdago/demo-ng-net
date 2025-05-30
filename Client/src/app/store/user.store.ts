import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { User } from '../types/user';
import { inject } from "@angular/core";
import { UserService } from "../services/user.service";
import { map, Observable, tap } from "rxjs";

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState({
        userConnected: {} as User,
    }),
    withMethods((store, userService = inject(UserService)) => ({
        loadProfile(): Observable<boolean> {
            return userService.getProfile().pipe(
                tap(user => {
                    patchState(store, { userConnected: user });
                }),
                map((user) => user.auth)
            );
        }
    }))
);