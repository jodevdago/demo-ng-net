import { inject } from "@angular/core";
import { Ticket } from "../types/ticket";
import { TicketsService } from "../services/tickets.service";
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TicketDto } from "../types/ticketDto";

export const TicketsStore = signalStore(
    { providedIn: 'root' },
    withState({
        tickets: [] as Ticket[],
        lastUserIds: [] as string[],
    }),
    withMethods((store, ticketsService = inject(TicketsService)) => ({
        loadTicketsByUserIds(userIds: string[]) {
            const request$ = userIds.length
                ? ticketsService.getTicketByUsers(userIds)
                : ticketsService.getTickets();

            request$.subscribe(tickets => {
                patchState(store, { tickets, lastUserIds: userIds });
            });
        },

        reload() {
            const ids = store.lastUserIds();
            const request$ = ids.length
                ? ticketsService.getTicketByUsers(ids)
                : ticketsService.getTickets();

            request$.subscribe(tickets => {
                patchState(store, { tickets });
            });
        },

        createTicket(ticketData: TicketDto) {
            ticketsService.createTicket(ticketData).subscribe(() => {
                this.reload();
            });
        },

        updateTicket(ticketId: string, updateData: TicketDto) {
            ticketsService.updateTicket(ticketId, updateData).subscribe(() => {
                this.reload();
            });
        },

        deleteTicket(ticketId: string) {
            ticketsService.deleteTicket(ticketId).subscribe(() => {
                this.reload();
            });
        },
    }))
);

