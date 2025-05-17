using DemoApi.DTOs;

namespace DemoApi.Services
{
	public interface IUserService
	{
		Task<IEnumerable<ReadUserDto>> GetAllUsersAsync();
		Task<ReadUserDto?> GetUserByIdAsync(Guid id);
		Task<ReadUserDto> CreateUserAsync(CreateUserDto dto);
		Task<bool> UpdateUserAsync(UpdateUserDto dto);
		Task<bool> DeleteUserAsync(Guid id);
		Task<ReadUserDto?> GetProfileAsync(Guid userId);
		Task<bool> ResetPasswordAsync(string email, string newPassword);
	}
}
