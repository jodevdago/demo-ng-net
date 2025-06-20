import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { inject, DestroyRef } from '@angular/core';
import { Ticket } from '../types/ticket.type';
import { TicketsService } from '../services/tickets.service';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TicketDto } from '../types/ticketDto.type';
import { MatSnackBar } from '@angular/material/snack-bar';

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
      destroyRef = inject(DestroyRef),
    ) => ({
      loadTicketsByUserIds(userIds: string[]) {
        const request$ = userIds.length
          ? ticketsService.getTicketByUsers(userIds)
          : ticketsService.getTickets();

        request$.pipe(takeUntilDestroyed(destroyRef)).subscribe((tickets) => {
          patchState(store, { tickets, lastUserIds: userIds });
        });
      },

      reload() {
        const ids = store.lastUserIds();
        const request$ = ids.length
          ? ticketsService.getTicketByUsers(ids)
          : ticketsService.getTickets();

        request$.pipe(takeUntilDestroyed(destroyRef)).subscribe((tickets) => {
          patchState(store, { tickets });
        });
      },

      createTicket(ticketData: TicketDto) {
        ticketsService
          .createTicket(ticketData)
          .pipe(takeUntilDestroyed(destroyRef))
          .subscribe(() => {
            this.reload();
            snackBar.open('Ticket created successfully', 'Close', {
              duration: 3000,
            });
          });
      },

      updateTicket(ticketId: string, updateData: TicketDto) {
        ticketsService
          .updateTicket(ticketId, updateData)
          .pipe(takeUntilDestroyed(destroyRef))
          .subscribe(() => {
            this.reload();
            snackBar.open('Ticket updated successfully', 'Close', {
              duration: 3000,
            });
          });
      },

      deleteTicket(ticketId: string) {
        ticketsService
          .deleteTicket(ticketId)
          .pipe(takeUntilDestroyed(destroyRef))
          .subscribe(() => {
            this.reload();
            snackBar.open('Ticket deleted successfully', 'Close', {
              duration: 3000,
            });
          });
      },
    }),
  ),
);
