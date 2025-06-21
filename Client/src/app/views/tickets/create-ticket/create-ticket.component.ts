import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { map, Observable, of, startWith } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TicketsStore } from '@store/ticket.store';
import { UserStore } from '@store/user.store';
import { UserService } from '@services/user.service';
import { TicketStatus } from '@enums/ticket-status.enum';
import { User } from '../../../types/user.type';
import { TicketDto } from '../../../types/ticketDto.type';

interface TicketForm {
  title: FormControl<string | undefined>;
  desc: FormControl<string | undefined>;
  priority: FormControl<number | undefined>;
  status: FormControl<TicketStatus | undefined>;
  assigned: FormControl<User | null | undefined>;
}
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
  options: Partial<User>[] = [];
  users$: Observable<Partial<User>[]> = of([]);
  form: FormGroup<TicketForm>;

  ticketStore = inject(TicketsStore);
  userStore = inject(UserStore);

  readonly TICKETSTATUS = TicketStatus;

  fb = inject(FormBuilder);
  usersService = inject(UserService);
  dialogRef = inject(MatDialogRef<CreateTicketComponent>);
  destroyRef = inject(DestroyRef);
  public data = inject(MAT_DIALOG_DATA);

  constructor() {
    this.form = this.fb.group<TicketForm>({
      desc: this.fb.control(this.data?.desc || '', Validators.required),
      priority: this.fb.control(this.data?.priority || 0, Validators.required),
      title: this.fb.control(this.data?.title || '', Validators.required),
      assigned: this.fb.control(this.data?.assigned || {}, Validators.required),
      status: this.fb.control(this.data?.status || TicketStatus.PENDING, Validators.required),
    });

    this.usersService
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((x) => {
        this.options = x;
      });
  }

  ngOnInit(): void {
    this.users$ = this.form.controls.assigned.valueChanges.pipe(
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
      this.form.controls.desc.disable();
      this.form.controls.priority.disable();
      this.form.controls.title.disable();
      this.form.controls.assigned.disable();
      this.form.controls.status.enable();
    }
  }

  displayFn(user: User): string {
    return user && user.fullname ? user.fullname : '';
  }

  createOrUpdate(): void {
    const formdata: TicketDto = {
      title: this.form.value.title || '',
      desc: this.form.value.desc || '',
      priority: this.form.value.priority || 1,
      status: this.form.value.status || TicketStatus.PENDING,
      assignedId: this.form.value.assigned?.id || '',
    };
    if (this.data) {
      this.ticketStore.updateTicket(this.data.id, formdata);
      this.form.patchValue({
        desc: '',
        priority: 0,
        title: '',
        assigned: null,
      });
      this.dialogRef.close();
    } else {
      this.ticketStore.createTicket(formdata);
      this.form.patchValue({
        desc: '',
        priority: 0,
        title: '',
        assigned: null,
      });
      this.dialogRef.close();
    }
  }

  private _filter(name: string): Partial<User>[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(
      (option) => option.fullname && option.fullname.toLowerCase().includes(filterValue),
    );
  }
}
