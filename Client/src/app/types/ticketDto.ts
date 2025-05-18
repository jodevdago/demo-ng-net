export interface TicketDto {
    title: string;
    desc: string;
    priority: number;
    status: "PENDING" | "INPROGRESS" | "FINISHED" | "CLOSED",
    assignedId: string;
}