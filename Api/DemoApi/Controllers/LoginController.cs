using Microsoft.AspNetCore.Mvc;
using DemoApi.DTOs;
using DemoApi.Services;

namespace DemoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IAuthService _authService;

        public LoginController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var token = await _authService.AuthenticateAsync(loginDto.Email, loginDto.Password);
            if (token == null)
                return Unauthorized("Invalid credentials.");

            return Ok(new { token });
        }
    }
}
