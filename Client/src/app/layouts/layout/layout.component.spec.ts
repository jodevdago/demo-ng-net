import { TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { of } from 'rxjs';
import { AuthService } from '@services/auth.service';

describe('LayoutComponent', () => {
  let component: LayoutComponent;

  beforeEach(() => {
    const authServiceMock = {
      logout: jest.fn().mockReturnValue(of(void 0)),
    };

    TestBed.configureTestingModule({
      providers: [LayoutComponent, { provide: AuthService, useValue: authServiceMock }],
    });

    component = TestBed.inject(LayoutComponent);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle isExpanded state', () => {
    expect(component.isExpanded).toBeTruthy();
    component.toggleMenu();
    expect(component.isExpanded).toBeFalsy();
    component.toggleMenu();
    expect(component.isExpanded).toBeTruthy();
  });
});
