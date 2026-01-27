namespace Hotel.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;

        // IMPORTANT: Must match Authorize(Roles="User,Admin")
        public string Role { get; set; } = "User";

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
