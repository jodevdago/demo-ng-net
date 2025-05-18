using DemoApi.Data;
using DemoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DemoApi.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly AppDbContext _context;

        public TicketRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Ticket>> GetAllAsync()
        {
            return await _context.Tickets.Include(t => t.Assigned).ToListAsync();
        }

        public async Task<Ticket?> GetByIdAsync(Guid id)
        {
            return await _context.Tickets.Include(t => t.Assigned).FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<List<Ticket>> GetByUserIdAsync(Guid userId)
        {
            return await _context.Tickets.Include(t => t.Assigned)
                .Where(t => t.AssignedId == userId)
                .ToListAsync();
        }

        public async Task<List<Ticket>> GetByUserIdsAsync(List<Guid> userIds)
        {
            return await _context.Tickets.Include(t => t.Assigned)
                .Where(t => userIds.Contains(t.AssignedId))
                .ToListAsync();
        }

        public async Task<Ticket> CreateAsync(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }

        public async Task UpdateAsync(Ticket ticket)
        {
            _context.Tickets.Update(ticket);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket != null)
            {
                _context.Tickets.Remove(ticket);
                await _context.SaveChangesAsync();
            }
        }
    }
}
