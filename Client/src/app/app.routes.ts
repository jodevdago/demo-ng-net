import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { UnauthorizedComponent } from './layouts/errors/unauthorized/unauthorized.component';
import { AuthGuard } from '@guards/auth.guard';
import { userGuard } from '@guards/user.guard';
import { InternalServerErrorComponent } from './layouts/errors/internal-server-error/internal-server-error.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    title: 'Unauthorized'
  },
  {
    path: 'server-error',
    component: InternalServerErrorComponent,
    title: 'Error 500'
  },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./views/tickets/tickets.component').then(m => m.TicketsComponent),
        title: 'Tickets',
      },
      {
        path: 'tickets',
        loadComponent: () => import('./views/tickets/tickets.component').then(m => m.TicketsComponent),
        title: 'Tickets',
      },
      {
        path: 'users',
        loadComponent: () => import('./views/users/users.component').then(m => m.UsersComponent),
        canActivate: [userGuard],
        title: 'Users',
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
]
