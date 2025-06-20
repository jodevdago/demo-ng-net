import { TicketStatus } from '@enums/ticket-status.enum';

export interface TicketDto {
  title: string;
  desc: string;
  priority: number;
  status: TicketStatus;
  assignedId: string;
}
