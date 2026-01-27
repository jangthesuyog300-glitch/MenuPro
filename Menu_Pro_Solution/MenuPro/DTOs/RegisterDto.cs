namespace Hotel.DTOs
{
    public class RegisterDto
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; } // "User" / "Admin" / "Manager"

        public int? RestaurantId { get; set; } // ✅ for Manager/Admin
    }
}
