using DemoApi.Models;

namespace DemoApi.Repositories
{
	public interface ITicketRepository
	{
		Task<List<Ticket>> GetAllAsync();
		Task<Ticket?> GetByIdAsync(Guid id);
		Task<List<Ticket>> GetByUserIdAsync(Guid userId);
		Task<List<Ticket>> GetByUserIdsAsync(List<Guid> userIds);
		Task<Ticket> CreateAsync(Ticket ticket);
		Task UpdateAsync(Ticket ticket);
		Task DeleteAsync(Guid id);
	}
}
