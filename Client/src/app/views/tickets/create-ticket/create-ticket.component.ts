import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Inject,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TicketsStore } from '@store/ticket.store';
import { UserStore } from '@store/user.store';
import { UserService } from '@services/user.service';
import { TicketStatus } from '@enums/ticket-status.enum';
import { User } from '@type/user.type';
import { TicketDto } from '@type/ticketDto.type';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    CommonModule,
    ReactiveFormsModule,
    MatDividerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.scss',
})
export class CreateTicketComponent implements OnInit {
  options: any[] = [];
  users$: Observable<any[]> = of([]);
  form: FormGroup;

  ticketStore = inject(TicketsStore);
  userStore = inject(UserStore);

  readonly TICKETSTATUS = TicketStatus;

  constructor(
    private fb: FormBuilder,
    private usersService: UserService,
    private dialogRef: MatDialogRef<CreateTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private destroyRef: DestroyRef,
  ) {
    this.form = this.fb.group({
      desc: [data?.desc || '', Validators.required],
      priority: [data?.priority || 0, Validators.required],
      title: [data?.title || '', Validators.required],
      assigned: [data?.assigned || {}, Validators.required],
      status: [data?.status || TicketStatus.PENDING, Validators.required],
    });

    this.usersService
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((x) => {
        this.options = x;
      });
  }

  ngOnInit(): void {
    this.users$ = this.form.get('assigned')!.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef),
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.fullname;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );

    const userConnected = this.userStore.userConnected;
    if (userConnected().role == 'Admin') {
      this.form.enable();
    } else {
      this.form.get('desc')?.disable();
      this.form.get('priority')?.disable();
      this.form.get('title')?.disable();
      this.form.get('assigned')?.disable();
      this.form.get('status')?.enable();
    }
  }

  displayFn(user: User): string {
    return user && user.fullname ? user.fullname : '';
  }

  createOrUpdate(): void {
    const formdata: TicketDto = {
      title: this.form.get('title')?.value,
      desc: this.form.get('desc')?.value,
      priority: this.form.get('priority')?.value,
      status: this.form.get('status')?.value,
      assignedId: this.form.get('assigned')?.value.id,
    };
    if (this.data) {
      this.ticketStore.updateTicket(this.data.id, formdata);
      this.form.patchValue({
        desc: '',
        priority: 0,
        title: '',
        assigned: {},
      });
      this.dialogRef.close();
    } else {
      this.ticketStore.createTicket(formdata);
      this.form.patchValue({
        desc: '',
        priority: 0,
        title: '',
        assigned: {},
      });
      this.dialogRef.close();
    }
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option) => option.fullname.toLowerCase().includes(filterValue));
  }
}
