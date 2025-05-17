using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DemoApi.Models;
using DemoApi.Data;
using DemoApi.DTOs;
using DemoApi.Services;
using AutoMapper;
using System.Security.Claims;  
using Microsoft.AspNetCore.Authorization;

namespace DemoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly PasswordService _passwordService;
        private readonly IMapper _mapper;

        public UserController(AppDbContext context, PasswordService passwordService, IMapper mapper)
        {
            _context = context;
            _passwordService = passwordService;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReadUserDto>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            var userDtos = _mapper.Map<List<ReadUserDto>>(users);

            return Ok(userDtos);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<ReadUserDto>> GetUserById(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return NotFound();

            var readUserDto = _mapper.Map<ReadUserDto>(user);

            return Ok(readUserDto);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
        {
            if (!Enum.IsDefined(typeof(UserLevel), createUserDto.Level))
            {
                return BadRequest("Invalid user level.");
            }

            var emailExists = await _context.Users.AnyAsync(u => u.Email == createUserDto.Email);
            if (emailExists)
            {
                return BadRequest("Email already in use.");
            }

            var hashedPassword = _passwordService.HashPassword(createUserDto.Password);
            createUserDto.Password = hashedPassword;

            var newUser = _mapper.Map<User>(createUserDto);

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            var response = _mapper.Map<ReadUserDto>(newUser);

            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, response);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(Guid id, [FromBody] UpdateUserDto updateUserDto)
        {
            if (id != updateUserDto.Id)
                return BadRequest("L'ID ne correspond pas.");

            if (updateUserDto.Level == null || !Enum.IsDefined(typeof(UserLevel), updateUserDto.Level))
                return BadRequest("Invalid user level.");

            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _mapper.Map(updateUserDto, user);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Users.Any(u => u.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<ActionResult<ReadUserDto>> GetProfile()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
            {
                return Unauthorized();
            }

            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return NotFound();

            return Ok(_mapper.Map<ReadUserDto>(user));
        }
    }
}
