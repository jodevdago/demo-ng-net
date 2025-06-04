import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { UnauthorizedComponent } from './layouts/unauthorized/unauthorized.component';
import { AuthGuard } from '@guards/auth.guard';
import { userGuard } from '@guards/user.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Support IT'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Support IT'
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    title: 'Support IT | unauthorized'
  },
  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./views/tickets/tickets.component').then(m => m.TicketsComponent),
        title: 'Support IT | Tickets',
      },
      {
        path: 'tickets',
        loadComponent: () => import('./views/tickets/tickets.component').then(m => m.TicketsComponent),
        title: 'Support IT | Tickets',
      },
      {
        path: 'users',
        loadComponent: () => import('./views/users/users.component').then(m => m.UsersComponent),
        canActivate: [userGuard],
        title: 'Support IT | Users',
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },
]
