using System;
using System.ComponentModel.DataAnnotations;
using DemoApi.DTOs;

namespace DemoApi.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public required string Fullname { get; set; }

        public required string Email { get; set; }

        public required UserRole Role { get; set; } = UserRole.User;

        public required bool Auth { get; set; } = false;

        public required UserLevel Level { get; set; }

        [Required]
        public required string Password { get; set; }

        public User() { }

        public User(string fullname, string email, UserLevel level)
        {
            Fullname = fullname;
            Email = email;
            Level = level;
        }
    }

}
