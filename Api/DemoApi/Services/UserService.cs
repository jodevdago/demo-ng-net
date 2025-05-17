using AutoMapper;
using DemoApi.DTOs;
using DemoApi.Models;
using DemoApi.Repositories;

namespace DemoApi.Services
{
	public class UserService : IUserService
	{
		private readonly IUserRepository _userRepository;
		private readonly PasswordService _passwordService;
		private readonly IMapper _mapper;

		public UserService(IUserRepository userRepository, PasswordService passwordService, IMapper mapper)
		{
			_userRepository = userRepository;
			_passwordService = passwordService;
			_mapper = mapper;
		}

		public async Task<IEnumerable<ReadUserDto>> GetAllUsersAsync()
		{
			var users = await _userRepository.GetAllAsync();
			return _mapper.Map<List<ReadUserDto>>(users);
		}

		public async Task<ReadUserDto?> GetUserByIdAsync(Guid id)
		{
			var user = await _userRepository.GetByIdAsync(id);
			return user == null ? null : _mapper.Map<ReadUserDto>(user);
		}

		public async Task<ReadUserDto> CreateUserAsync(CreateUserDto dto)
		{
			if (!Enum.IsDefined(typeof(UserLevel), dto.Level))
				throw new ArgumentException("Invalid user level.");

			var exists = await _userRepository.ExistsByEmailAsync(dto.Email);
			if (exists)
				throw new InvalidOperationException("Email already in use.");

			dto.Password = _passwordService.HashPassword(dto.Password);
			var user = _mapper.Map<User>(dto);

			await _userRepository.AddAsync(user);

			return _mapper.Map<ReadUserDto>(user);
		}

		public async Task<bool> UpdateUserAsync(UpdateUserDto dto)
		{
			var user = await _userRepository.GetByIdAsync(dto.Id);
			if (user == null)
				return false;

			if (dto.Level == null || !Enum.IsDefined(typeof(UserLevel), dto.Level))
				throw new ArgumentException("Invalid user level.");

			_mapper.Map(dto, user);
			await _userRepository.UpdateAsync(user);
			return true;
		}

		public async Task<bool> DeleteUserAsync(Guid id)
		{
			var user = await _userRepository.GetByIdAsync(id);
			if (user == null)
				return false;

			await _userRepository.DeleteAsync(user);
			return true;
		}

		public async Task<ReadUserDto?> GetProfileAsync(Guid userId)
		{
			var user = await _userRepository.GetByIdAsync(userId);
			return user == null ? null : _mapper.Map<ReadUserDto>(user);
		}

		public async Task<bool> ResetPasswordAsync(string email, string newPassword)
		{
			var user = await _userRepository.GetByEmailAsync(email);
			if (user == null) return false;

			user.Password = _passwordService.HashPassword(newPassword);
			await _userRepository.UpdateAsync(user);
			return true;
		}
	}
}
