namespace Hotel.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string Role { get; set; } = "Customer";

        // Navigation
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }

}
