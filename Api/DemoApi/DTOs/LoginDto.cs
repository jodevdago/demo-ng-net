using System;
using System.ComponentModel.DataAnnotations;

namespace DemoApi.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }
    }

}
