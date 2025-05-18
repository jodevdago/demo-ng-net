using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DemoApi.Dtos;
using DemoApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace DemoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketController : ControllerBase
    {
        private readonly ITicketService _ticketService;

        public TicketController(ITicketService ticketService)
        {
            _ticketService = ticketService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<ReadTicketDto>>> GetAllTickets() =>
            Ok(await _ticketService.GetAllTicketsAsync());

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ReadTicketDto>> GetTicketById(Guid id)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);
            return ticket == null ? NotFound() : Ok(ticket);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<ReadTicketDto>> CreateTicket([FromBody] CreateTicketDto dto)
        {
            var ticket = await _ticketService.CreateTicketAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = ticket.Id }, ticket);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(Guid id, [FromBody] UpdateTicketDto dto)
        {
            if (id != dto.Id) return BadRequest("ID mismatch.");
            var result = await _ticketService.UpdateTicketAsync(dto);
            return result ? NoContent() : NotFound();
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(Guid id)
        {
            var result = await _ticketService.DeleteTicketAsync(id);
            return result ? NoContent() : NotFound();
        }

        [Authorize]
        [HttpGet("by-user/{userId}")]
        public async Task<ActionResult<List<ReadTicketDto>>> GetTicketByUser(Guid userId) =>
            Ok(await _ticketService.GetTicketsByUserIdAsync(userId));

        [Authorize]
        [HttpPost("by-users")]
        public async Task<ActionResult<List<ReadTicketDto>>> GetTicketByUsers([FromBody] List<Guid> userIds) =>
            Ok(await _ticketService.GetTicketsByUserIdsAsync(userIds));
    }
}
