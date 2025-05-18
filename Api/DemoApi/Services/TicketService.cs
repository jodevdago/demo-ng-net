using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DemoApi.Dtos;
using DemoApi.Models;
using DemoApi.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DemoApi.Services
{
    public class TicketService : ITicketService
    {
        private readonly ITicketRepository _repository;
        private readonly IMapper _mapper;

        public TicketService(ITicketRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<ReadTicketDto>> GetAllTicketsAsync()
        {
            var tickets = await _repository.GetAllAsync();
            return tickets.Select(t => _mapper.Map<ReadTicketDto>(t)).ToList();
        }

        public async Task<ReadTicketDto?> GetTicketByIdAsync(Guid id)
        {
            var ticket = await _repository.GetByIdAsync(id);
            return ticket == null ? null : _mapper.Map<ReadTicketDto>(ticket);
        }

        public async Task<List<ReadTicketDto>> GetTicketsByUserIdAsync(Guid userId)
        {
            var tickets = await _repository.GetByUserIdAsync(userId);
            return tickets.Select(t => _mapper.Map<ReadTicketDto>(t)).ToList();
        }

        public async Task<List<ReadTicketDto>> GetTicketsByUserIdsAsync(List<Guid> userIds)
        {
            var tickets = await _repository.GetByUserIdsAsync(userIds);
            return tickets.Select(t => _mapper.Map<ReadTicketDto>(t)).ToList();
        }

        public async Task<ReadTicketDto> CreateTicketAsync(CreateTicketDto dto)
        {
            var ticket = _mapper.Map<Ticket>(dto);
            var created = await _repository.CreateAsync(ticket);
            return _mapper.Map<ReadTicketDto>(created);
        }

        public async Task<bool> UpdateTicketAsync(UpdateTicketDto dto)
        {
            var existing = await _repository.GetByIdAsync(dto.Id);
            if (existing == null)
                return false;

            _mapper.Map(dto, existing);
            await _repository.UpdateAsync(existing);
            return true;
        }

        public async Task<bool> DeleteTicketAsync(Guid id)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null)
                return false;

            await _repository.DeleteAsync(id);
            return true;
        }
    }
}
