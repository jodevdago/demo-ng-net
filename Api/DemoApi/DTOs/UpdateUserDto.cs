using System;
using System.ComponentModel.DataAnnotations;

namespace DemoApi.DTOs
{
    public class UpdateUserDto
    {
        public Guid Id { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "Fullname cannot be empty.")]
        public string? Fullname { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string? Email { get; set; }

        public UserRole? Role { get; set; } = UserRole.User;

        public bool? Auth { get; set; } = false;

        [Required]
        public UserLevel? Level { get; set; }
    }

}
