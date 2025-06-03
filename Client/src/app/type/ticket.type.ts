import { TicketStatus } from "@enums/ticket-status.enum";
import { User } from "./user.type";


export interface Ticket {
  desc: string;
  priority: number;
  title: string;
  createdOn: Date | any;
  assigned: User;
  id?: string;
  status: TicketStatus;
}
