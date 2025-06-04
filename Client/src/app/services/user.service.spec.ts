import { UserService } from '@services/user.service';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';
import { User } from '@type/user.type';

describe('UserService', () => {
  let service: UserService;
  let httpMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    const httpClientMock = {
      get: jest.fn(),
      put: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpClient) as jest.Mocked<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUsers() with correct URL', () => {
    const mockUsers = [{ id: '1', name: 'John' }];
    httpMock.get.mockReturnValue(of(mockUsers));

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    expect(httpMock.get).toHaveBeenCalledWith(environment.apiUrl + '/user');
  });

  it('should call updateUserField() with correct URL and data', () => {
    const userId = '123';
    const user: User = { id: userId, fullname: 'Alice', auth: true, email: 'test@test.com', level: 3, role: 1 };
    httpMock.put.mockReturnValue(of(void 0));

    service.updateUserField(userId, user).subscribe((res) => {
      expect(res).toBeUndefined();
    });

    expect(httpMock.put).toHaveBeenCalledWith(environment.apiUrl + '/user/' + userId, user);
  });

  it('should call getProfile() with correct URL', () => {
    const mockProfile: User = { id: '123', fullname: 'Alice', auth: true, email: 'test@test.com', level: 3, role: 1 };
    httpMock.get.mockReturnValue(of(mockProfile));

    service.getProfile().subscribe((profile) => {
      expect(profile).toEqual(mockProfile);
    });

    expect(httpMock.get).toHaveBeenCalledWith(environment.apiUrl + '/user/profile');
  });
});
