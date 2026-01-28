namespace Hotel.Models
{
    public class Restaurant
    {
        public int RestaurantId { get; set; }

        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Location { get; set; } = null!;
        public string? City { get; set; }

        public double Rating { get; set; }
        public int TotalRatings { get; set; }

        public bool IsActive { get; set; } = true;
        public int PriceForTwo { get; set; }

        public string? OpenTime { get; set; }
        public string? CloseTime { get; set; }
        public string? Phone { get; set; }

        public string? ImagePath { get; set; }

        public ICollection<Table> Tables { get; set; } = new List<Table>();
        public ICollection<FoodItem> FoodItems { get; set; } = new List<FoodItem>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();

        // ✅ Restaurant Managers
        public ICollection<User> Managers { get; set; } = new List<User>();
    }
}
