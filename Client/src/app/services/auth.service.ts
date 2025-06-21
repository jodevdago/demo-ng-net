import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly api = environment.apiUrl;

  http = inject(HttpClient);
  storage = inject(StorageService);
  router = inject(Router);

  register(fullname: string, email: string, password: string, level: number): Observable<void> {
    const createUserDto = {
      auth: false,
      role: 1,
      level: level,
      email: email,
      fullname: fullname,
      password: password,
    };
    return this.http.post<void>(`${this.api}/user`, createUserDto);
  }

  login(email: string, password: string): Observable<{ token: string }> {
    const loginDto = {
      email: email,
      password: password,
    };
    return this.http.post<{ token: string }>(`${this.api}/login`, loginDto);
  }

  logout(): Observable<void> {
    this.storage.removeItem('jwt');
    this.router.navigate(['./login']);
    return of();
  }
}
