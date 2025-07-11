import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { LevelPipe } from '@pipes/level.pipe';
import { UserService } from '@services/user.service';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatButtonModule,
    LevelPipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'fullname', 'level', 'role', 'auth'];
  dataSource!: MatTableDataSource<Partial<User>>;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  service = inject(UserService);
  destroyRef = inject(DestroyRef);
  snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.service
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((users) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  change(row: User): void {
    const id = row.id as string;
    this.service
      .updateUserField(id, { ...row, auth: !row.auth })
      .pipe(
        switchMap(() => {
          return this.service.getUsers();
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((users) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.snackBar.open('User updated successfully', 'Close', { duration: 2000 });
      });
  }
}
