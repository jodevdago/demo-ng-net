using DemoApi.Data;
using DemoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DemoApi.Repositories
{
	public class UserRepository : IUserRepository
	{
		private readonly AppDbContext _context;

		public UserRepository(AppDbContext context) => _context = context;

		public Task<List<User>> GetAllAsync() => _context.Users.ToListAsync();

		public Task<User?> GetByIdAsync(Guid id) => _context.Users.FindAsync(id).AsTask();

		public Task<User?> GetByEmailAsync(string email) =>
			_context.Users.SingleOrDefaultAsync(u => u.Email == email);

		public Task<bool> ExistsByEmailAsync(string email) =>
			_context.Users.AnyAsync(u => u.Email == email);

		public Task<bool> ExistsByIdAsync(Guid id) =>
			_context.Users.AnyAsync(u => u.Id == id);

		public async Task AddAsync(User user)
		{
			_context.Users.Add(user);
			await _context.SaveChangesAsync();
		}

		public async Task UpdateAsync(User user)
		{
			_context.Users.Update(user);
			await _context.SaveChangesAsync();
		}

		public async Task DeleteAsync(User user)
		{
			_context.Users.Remove(user);
			await _context.SaveChangesAsync();
		}
	}
}
