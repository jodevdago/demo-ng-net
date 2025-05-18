using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DemoApi.Dtos;

namespace DemoApi.Services
{
    public interface ITicketService
    {
        Task<List<ReadTicketDto>> GetAllTicketsAsync();
        Task<ReadTicketDto?> GetTicketByIdAsync(Guid id);
        Task<List<ReadTicketDto>> GetTicketsByUserIdAsync(Guid userId);
        Task<List<ReadTicketDto>> GetTicketsByUserIdsAsync(List<Guid> userIds);
        Task<ReadTicketDto> CreateTicketAsync(CreateTicketDto dto);
        Task<bool> UpdateTicketAsync(UpdateTicketDto dto);
        Task<bool> DeleteTicketAsync(Guid id);
    }
}
