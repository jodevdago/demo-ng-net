import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: jest.Mocked<HttpClient>;
  let storageMock: jest.Mocked<StorageService>;
  let routerMock: jest.Mocked<Router>;

  beforeEach(() => {
    const httpClientMock = { post: jest.fn() };
    const storageServiceMock = { removeItem: jest.fn() };
    const routerServiceMock = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientMock },
        { provide: StorageService, useValue: storageServiceMock },
        { provide: Router, useValue: routerServiceMock },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpClient) as jest.Mocked<HttpClient>;
    storageMock = TestBed.inject(StorageService) as jest.Mocked<StorageService>;
    routerMock = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call register() with correct data', () => {
    const fullname = 'John Doe';
    const email = 'john@example.com';
    const password = 'securepass';
    const level = 2;

    const expectedDto = {
      auth: false,
      role: 1,
      level,
      email,
      fullname,
      password,
    };

    httpMock.post.mockReturnValue(of(void 0));

    service.register(fullname, email, password, level).subscribe((res) => {
      expect(res).toBeUndefined();
    });

    expect(httpMock.post).toHaveBeenCalledWith(`${environment.apiUrl}/user`, expectedDto);
  });

  it('should call login() with correct credentials', () => {
    const email = 'john@example.com';
    const password = 'password123';
    const mockResponse = { token: 'mockToken' };

    httpMock.post.mockReturnValue(of(mockResponse));

    service.login(email, password).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    expect(httpMock.post).toHaveBeenCalledWith(`${environment.apiUrl}/login`, { email, password });
  });

  it('should call logout() and remove JWT from storage', () => {
    const result = service.logout();

    expect(storageMock.removeItem).toHaveBeenCalledWith('jwt');
    expect(routerMock.navigate).toHaveBeenCalledWith(['./login']);

    result.subscribe((res) => {
      expect(res).toBeUndefined();
    });
  });
});
