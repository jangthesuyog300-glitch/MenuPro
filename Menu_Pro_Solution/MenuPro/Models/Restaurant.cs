namespace Hotel.Models
{
    public class Restaurant
    {
        public int RestaurantId { get; set; }

        public string Name { get; set; } = null!;
        public string Location { get; set; } = null!;
        public double Rating { get; set; }
        public bool IsActive { get; set; } = true;

        // ✅ Restaurant Image
        public string? ImagePath { get; set; }

        // Navigation
        public ICollection<Table> Tables { get; set; } = new List<Table>();
        public ICollection<FoodItem> FoodItems { get; set; } = new List<FoodItem>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
    }
}
