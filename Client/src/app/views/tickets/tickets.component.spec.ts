import { Ticket } from '../../types/ticket.type';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { TicketsComponent } from './tickets.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TicketsStore } from '@store/ticket.store';
import { UserStore } from '@store/user.store';

describe('TicketsComponent', () => {
  let component: TicketsComponent;
  let fixture: ComponentFixture<TicketsComponent>;

  let mockTicketStore: any;
  let mockUserStore: any;
  let mockDialog: any;

  beforeEach(async () => {
    mockTicketStore = {
      tickets: signal<Ticket[]>([
        { id: '1', title: 'Test Ticket', status: 'PENDING' } as Ticket,
        { id: '2', title: 'Another Ticket', status: 'CLOSED' } as Ticket,
      ]),
      deleteTicket: jest.fn(),
      loadTicketsByUserIds: jest.fn(),
      updateTicket: jest.fn(),
    };

    mockUserStore = {
      userConnected: signal({ id: '123', name: 'Test User' }),
    };

    mockDialog = {
      open: jest.fn().mockReturnValue({
        afterClosed: () => of({}),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [TicketsComponent, HttpClientTestingModule, NoopAnimationsModule],
      providers: [
        { provide: TicketsStore, useValue: mockTicketStore },
        { provide: UserStore, useValue: mockUserStore },
        { provide: MatDialog, useValue: mockDialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply filter to the table data source', () => {
    const mockEvent = { target: { value: 'test' } } as unknown as Event;

    component.dataSource = new MatTableDataSource([
      { id: '1', title: 'Test Ticket' },
      { id: '2', title: 'Another Ticket' },
    ] as any);

    component.applyFilter(mockEvent);

    expect(component.dataSource.filter).toBe('test');
  });

  it('should call deleteTicket when onDeleteTicket is called', () => {
    component.onDeleteTicket('1');
    expect(mockTicketStore.deleteTicket).toHaveBeenCalledWith('1');
  });

  it('should filter tickets by status in getListByName', () => {
    const pendingTickets = component.getListByName('pending');
    expect(pendingTickets.length).toBe(1);
    expect(pendingTickets[0].status).toBe('PENDING');

    const closedTickets = component.getListByName('closed');
    expect(closedTickets.length).toBe(1);
    expect(closedTickets[0].status).toBe('CLOSED');
  });
});
