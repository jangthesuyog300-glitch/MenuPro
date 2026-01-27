namespace Hotel.DTOs
{
    public class RegisterDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Password { get; set; }

        // Expected values: "User" or "Admin"
        public string? Role { get; set; }
    }
}
