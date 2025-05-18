using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace DemoApi.Models
{
    public class Ticket
    {
        [Key]
        public Guid Id { get; set; }

        public required string Title { get; set; }

        public required string Desc { get; set; }

        public required int Priority { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;

        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TicketStatus Status { get; set; } = TicketStatus.PENDING;

        [ForeignKey("Assigned")]
        public Guid AssignedId { get; set; }

        public User Assigned { get; set; } = null!;
    }

    public enum TicketStatus
    {
        PENDING,
        INPROGRESS,
        FINISHED,
        CLOSED
    }
}
