import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-internal-server-error',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './internal-server-error.component.html',
  styleUrl: './internal-server-error.component.scss',
})
export class InternalServerErrorComponent {}
