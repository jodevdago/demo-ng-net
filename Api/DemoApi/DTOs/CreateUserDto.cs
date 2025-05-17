using System;
using System.ComponentModel.DataAnnotations;
using DemoApi.DTOs;

namespace DemoApi.DTOs
{
	public class CreateUserDto
	{
		public Guid Id { get; set; }

		[Required]
		[MinLength(1, ErrorMessage = "Fullname cannot be empty.")]
		public required string Fullname { get; set; }

		[Required]
		[EmailAddress(ErrorMessage = "Invalid email address.")]
		public required string Email { get; set; }

		public required UserRole Role { get; set; } = UserRole.User;

		public required bool Auth { get; set; } = false;

		[Required]
		public required UserLevel Level { get; set; }

		[Required]
		public required string Password { get; set; }
	}

}
