using Microsoft.AspNetCore.Mvc;
using DemoApi.DTOs;
using DemoApi.Services;
using System.Security.Claims;  
using Microsoft.AspNetCore.Authorization;

namespace DemoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReadUserDto>>> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ReadUserDto>> GetUserById(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            return user == null ? NotFound() : Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
        {
            try
            {
                var createdUser = await _userService.CreateUserAsync(dto);
                return CreatedAtAction(nameof(GetUserById), new { id = createdUser.Id }, createdUser);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, [FromBody] UpdateUserDto dto)
        {
            if (id != dto.Id)
                return BadRequest("The ID does not match.");

            try
            {
                var updated = await _userService.UpdateUserAsync(dto);
                return updated ? Ok() : NotFound();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var deleted = await _userService.DeleteUserAsync(id);
            return deleted ? NoContent() : NotFound();
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<ActionResult<ReadUserDto>> GetProfile()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
                return Unauthorized();

            var user = await _userService.GetProfileAsync(userId);
            return user == null ? NotFound() : Ok(user);
        }

        [Authorize(Policy = "AdminOnly")]
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto dto)
        {
            var success = await _userService.ResetPasswordAsync(dto.Email, dto.Password);
            return success ? Ok("Password reset successfully.") : NotFound("User not found.");
        }
    }
}
