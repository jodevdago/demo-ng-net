using System;
using DemoApi.Models;
using DemoApi.DTOs;

namespace DemoApi.Dtos
{
    public class ReadTicketDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = null!;
        public string Desc { get; set; } = null!;
        public int Priority { get; set; }
        public DateTime CreatedOn { get; set; }
        public TicketStatus Status { get; set; }
        public ReadUserDto Assigned { get; set; } = null!;
    }
}
