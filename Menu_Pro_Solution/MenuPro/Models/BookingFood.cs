namespace Hotel.Models
{
    public class BookingFood
    {
        public int BookingFoodId { get; set; }

        public int BookingId { get; set; }
        public int FoodItemId { get; set; }

        public int Quantity { get; set; }
        public decimal Price { get; set; }

        // Navigation
        public Booking Booking { get; set; } = null!;
        public FoodItem FoodItem { get; set; } = null!;
    }

}
