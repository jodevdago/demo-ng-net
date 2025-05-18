using System;

namespace DemoApi.Dtos
{
	public class UpdateTicketDto : CreateTicketDto
		{
        public Guid Id { get; set; }
    }
}
