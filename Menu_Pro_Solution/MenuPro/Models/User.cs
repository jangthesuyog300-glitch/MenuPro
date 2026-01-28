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

        // ✅ Manager belongs to one restaurant (Customer/Admin can be null)
        public int? RestaurantId { get; set; }
        public Restaurant? Restaurant { get; set; }

        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
