import { User } from "./user";

export interface Ticket {
  desc: string;
  priority: number;
  title: string;
  createdOn: Date | any;
  assigned: User;
  id?: string;
  status: 'INPROGRESS' | 'PENDING' | 'FINISHED' | 'CLOSED';
}
