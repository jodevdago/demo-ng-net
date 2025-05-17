using Microsoft.AspNetCore.Identity;

namespace DemoApi.Services
{
	public class PasswordService
	{
		private readonly PasswordHasher<object> _passwordHasher = new PasswordHasher<object>();
		private readonly object _fakeUser = new();

		public string HashPassword(string password)
		{
			return _passwordHasher.HashPassword(_fakeUser, password);
		}

		public bool VerifyPassword(string hashedPassword, string providedPassword)
		{
			var result = _passwordHasher.VerifyHashedPassword(_fakeUser, hashedPassword, providedPassword);
			return result == PasswordVerificationResult.Success;
		}
	}
}
