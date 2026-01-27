namespace Hotel.Models
{
    public class FoodItem
    {
        public int FoodItemId { get; set; }

        public int RestaurantId { get; set; }
        public string FoodName { get; set; } = null!;
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; } = true;

        public Restaurant Restaurant { get; set; } = null!;
        public ICollection<BookingFood> BookingFoods { get; set; } = new List<BookingFood>();
    }
}
