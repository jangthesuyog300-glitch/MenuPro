namespace Hotel.Models
{
    public class Table
    {
        public int TableId { get; set; }

        public int RestaurantId { get; set; }
        public int TableNumber { get; set; }
        public int Capacity { get; set; }
        public string Status { get; set; } = "Available";

        // Navigation
        public Restaurant Restaurant { get; set; } = null!;
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }

}
