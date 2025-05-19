import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'support-it-app';

  loading = false;

  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.loaderService.loading$.subscribe(value => {
      this.loading = value;
      this.cdRef.detectChanges();
    });
  }
}
