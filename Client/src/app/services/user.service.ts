import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly api = environment.apiUrl;

  http = inject(HttpClient);

  getUsers(): Observable<Partial<User>[]> {
    return this.http.get<Partial<User>[]>(this.api + '/user');
  }

  updateUserField(userId: string, user: User): Observable<void> {
    return this.http.put<void>(this.api + '/user/' + userId, user);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.api + '/user/profile');
  }
}
