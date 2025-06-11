import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '@services/auth.service';
import { UserStore } from '@store/user.store';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatTooltipModule, CommonModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  @Input() isExpanded = false;
  @Output() toggleMenu = new EventEmitter();

  authService = inject(AuthService);
  store = inject(UserStore);

  user = this.store.userConnected;

  routeLinksAdmin = [
    { link: './tickets', name: 'Tickets', icon: 'view_agenda' },
    { link: './users', name: 'Users', icon: 'supervised_user_circle' },
  ];

  routeLinks = [{ link: './tickets', name: 'Tickets', icon: 'view_agenda' }];

  logout(): void {
    this.authService.logout();
  }
}
