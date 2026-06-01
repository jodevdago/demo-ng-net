import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Ticket } from '../types/ticket.type';
import { TicketsService } from '../services/tickets.service';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TicketDto } from '../types/ticketDto.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap, pipe, switchMap, tap } from 'rxjs';

export const TicketsStore = signalStore(
  { providedIn: 'root' },
  withState({
    tickets: [] as Ticket[],
    lastUserIds: [] as string[],
  }),
  withMethods(
    (
      store,
      ticketsService = inject(TicketsService),
      snackBar = inject(MatSnackBar),
    ) => {
      const fetchTickets = (ids: string[]) =>
        ids.length ? ticketsService.getTicketByUsers(ids) : ticketsService.getTickets();

      return {
        loadTicketsByUserIds: rxMethod<string[]>(
          pipe(
            switchMap((userIds) =>
              fetchTickets(userIds).pipe(
                tap((tickets) => patchState(store, { tickets, lastUserIds: userIds })),
              ),
            ),
          ),
        ),

        reload: rxMethod<void>(
          pipe(
            switchMap(() =>
              fetchTickets(store.lastUserIds()).pipe(
                tap((tickets) => patchState(store, { tickets })),
              ),
            ),
          ),
        ),

        createTicket: rxMethod<TicketDto>(
          pipe(
            exhaustMap((ticketData) =>
              ticketsService.createTicket(ticketData).pipe(
                switchMap(() => fetchTickets(store.lastUserIds())),
                tap((tickets) => {
                  patchState(store, { tickets });
                  snackBar.open('Ticket created successfully', 'Close', { duration: 3000 });
                }),
              ),
            ),
          ),
        ),

        updateTicket: rxMethod<{ id: string; data: TicketDto }>(
          pipe(
            exhaustMap(({ id, data }) =>
              ticketsService.updateTicket(id, data).pipe(
                switchMap(() => fetchTickets(store.lastUserIds())),
                tap((tickets) => {
                  patchState(store, { tickets });
                  snackBar.open('Ticket updated successfully', 'Close', { duration: 3000 });
                }),
              ),
            ),
          ),
        ),

        deleteTicket: rxMethod<string>(
          pipe(
            exhaustMap((ticketId) =>
              ticketsService.deleteTicket(ticketId).pipe(
                switchMap(() => fetchTickets(store.lastUserIds())),
                tap((tickets) => {
                  patchState(store, { tickets });
                  snackBar.open('Ticket deleted successfully', 'Close', { duration: 3000 });
                }),
              ),
            ),
          ),
        ),
      };
    },
  ),
);
