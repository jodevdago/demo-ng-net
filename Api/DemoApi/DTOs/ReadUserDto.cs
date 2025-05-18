namespace DemoApi.DTOs
{
    public class ReadUserDto
    {
        public Guid Id { get; set; }
        public required string Fullname { get; set; }
        public required string Email { get; set; }
        public required UserRole Role { get; set; } = UserRole.User;
        public required UserLevel Level { get; set; }
        public required bool Auth { get; set; }
    }
}
