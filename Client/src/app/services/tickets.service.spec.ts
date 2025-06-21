import { User } from './../types/user.type';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';
import { TicketsService } from './tickets.service';
import { TicketDto } from '../types/ticketDto.type';
import { TicketStatus } from '@enums/ticket-status.enum';
import { Ticket } from '../types/ticket.type';

describe('TicketsService', () => {
  let service: TicketsService;
  let httpMock: HttpTestingController;
  const API = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketsService],
    });
    service = TestBed.inject(TicketsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all tickets', () => {
    const mockTickets: Partial<Ticket>[] = [{ id: '1' }, { id: '2' }];

    service.getTickets().subscribe((tickets) => {
      expect(tickets.length).toBe(2);
      expect(tickets).toEqual(mockTickets);
    });

    const req = httpMock.expectOne(`${API}/ticket`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTickets);
  });

  it('should create a ticket', () => {
    const newTicket: TicketDto = {
      title: 'Updated',
      desc: 'Updated desc',
      assignedId: 'user2',
      priority: 0,
      status: TicketStatus.PENDING,
    };

    service.createTicket(newTicket).subscribe((result) => {
      expect(result).toEqual(newTicket);
    });

    const req = httpMock.expectOne(`${API}/ticket`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTicket);
    req.flush(newTicket);
  });

  it('should delete a ticket by id', () => {
    const id = '123';

    service.deleteTicket(id).subscribe((result) => {
      expect(result).toBeUndefined();
    });

    const req = httpMock.expectOne(`${API}/ticket/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Aucun contenu attendu
  });

  it('should update a ticket', () => {
    const id = '123';
    const updateData: TicketDto = {
      title: 'Updated',
      desc: 'Updated desc',
      assignedId: 'user2',
      priority: 0,
      status: TicketStatus.PENDING,
    };

    service.updateTicket(id, updateData).subscribe((result) => {
      expect(result).toBeUndefined();
    });

    const req = httpMock.expectOne(`${API}/ticket/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ ...updateData, id });
    req.flush(null);
  });

  it('should get tickets by userIds', () => {
    const userIds = ['u1', 'u2'];
    const mockTickets: Partial<Ticket>[] = [
      { id: '1', title: 'T1', desc: '', assigned: { id: 'u1' } as User },
      { id: '2', title: 'T2', desc: '', assigned: { id: 'u2' } as User },
    ];

    service.getTicketByUsers(userIds).subscribe((tickets) => {
      expect(tickets).toEqual(mockTickets);
    });

    const req = httpMock.expectOne(`${API}/ticket/by-users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(userIds);
    req.flush(mockTickets);
  });
});
