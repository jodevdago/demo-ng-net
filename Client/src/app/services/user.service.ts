import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../type/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.api + '/user');
  }

  updateUserField(userId: string, user: User): Observable<void> {
    return this.http.put<void>(this.api + '/user/' + userId, user);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.api + '/user/profile');
  }
}
