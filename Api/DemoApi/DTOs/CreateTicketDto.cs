using System;
using System.Text.Json.Serialization;
using DemoApi.Models;

namespace DemoApi.Dtos
{
    public class CreateTicketDto
    {
        public required string Title { get; set; }

        public required string Desc { get; set; }

        public required int Priority { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public required TicketStatus Status { get; set; }

        public required Guid AssignedId { get; set; }
    }
}
