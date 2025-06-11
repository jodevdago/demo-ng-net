import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTicketComponent } from './create-ticket.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from '@services/user.service';
import { TicketsStore } from '@store/ticket.store';
import { UserStore } from '@store/user.store';

describe('CreateTicketComponent', () => {
  let component: CreateTicketComponent;
  let fixture: ComponentFixture<CreateTicketComponent>;
  let mockUserService: any;
  let mockDialogRef: any;
  let mockTicketStore: any;
  let mockUserStore: any;

  const mockUsers = [
    { id: '1', fullname: 'John Doe' },
    { id: '2', fullname: 'Jane Smith' },
  ];

  beforeEach(async () => {
    mockUserService = {
      getUsers: jest.fn().mockReturnValue(of(mockUsers)),
    };

    mockDialogRef = {
      close: jest.fn(),
    };

    mockTicketStore = {
      createTicket: jest.fn(),
      updateTicket: jest.fn(),
    };

    mockUserStore = {
      userConnected: () => ({ role: 'Admin' }),
    };

    await TestBed.configureTestingModule({
      imports: [CreateTicketComponent, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: null },
        { provide: TicketsStore, useValue: mockTicketStore },
        { provide: UserStore, useValue: mockUserStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and initialize form', () => {
    expect(component).toBeTruthy();
    expect(component.form).toBeDefined();
    expect(component.options).toEqual(mockUsers);
  });

  it('should filter users correctly', () => {
    const filtered = component[`_filter`]('Jane');
    expect(filtered.length).toBe(1);
    expect(filtered[0].fullname).toBe('Jane Smith');
  });

  it('should call createTicket when no data is passed', () => {
    component.form.setValue({
      title: 'New Ticket',
      desc: 'Description',
      priority: 1,
      status: 'PENDING',
      assigned: { id: '1', fullname: 'John Doe' },
    });

    component.createOrUpdate();

    expect(mockTicketStore.createTicket).toHaveBeenCalledWith({
      title: 'New Ticket',
      desc: 'Description',
      priority: 1,
      status: 'PENDING',
      assignedId: '1',
    });

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should call updateTicket when data is passed', () => {
    const testData = {
      id: 'ticket123',
      title: 'Old Ticket',
      desc: 'Old description',
      priority: 2,
      status: 'IN_PROGRESS',
      assigned: { id: '2', fullname: 'Jane Smith' },
    };

    component.data = testData;
    component.form.patchValue({
      title: 'Updated Title',
      desc: 'Updated Desc',
      priority: 3,
      status: 'DONE',
      assigned: { id: '2', fullname: 'Jane Smith' },
    });

    component.createOrUpdate();

    expect(mockTicketStore.updateTicket).toHaveBeenCalledWith('ticket123', {
      title: 'Updated Title',
      desc: 'Updated Desc',
      priority: 3,
      status: 'DONE',
      assignedId: '2',
    });

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should disable fields for non-admin users', () => {
    mockUserStore.userConnected = () => ({ role: 'User' });

    // Force re-run ngOnInit
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.get('desc')?.disabled).toBe(true);
    expect(component.form.get('priority')?.disabled).toBe(true);
    expect(component.form.get('title')?.disabled).toBe(true);
    expect(component.form.get('assigned')?.disabled).toBe(true);
    expect(component.form.get('status')?.enabled).toBe(true);
  });
});
