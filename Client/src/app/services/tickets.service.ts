import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../types/ticket';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { TicketDto } from '../types/ticketDto';

@Injectable({
  providedIn: 'root',
})
export class TicketsService {
  private readonly api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.api + '/ticket');
  }

  createTicket(data: TicketDto): Observable<TicketDto> {
    return this.http.post<TicketDto>(this.api + '/ticket', data);
  }

  deleteTicket(id: string): Observable<void> {
    return this.http.delete<void>(this.api + '/ticket/' + id);
  }

  updateTicket(id: string, data: TicketDto): Observable<void> {
    const ticket = {
      ...data,
      id: id
    }
    return this.http.put<void>(this.api + '/ticket/' + id, ticket);
  }

  getTicketByUsers(userIds: string[]): Observable<Ticket[]> {
    return this.http.post<Ticket[]>(this.api + '/ticket/by-users', userIds);
  }
}
