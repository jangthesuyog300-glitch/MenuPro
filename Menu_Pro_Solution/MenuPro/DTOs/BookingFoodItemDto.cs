namespace MenuPro.DTOs
{
    public class BookingFoodItemDto
    {
        public int FoodItemId { get; set; }
        public string Name { get; set; } = "";
        public int Quantity { get; set; }
        public decimal? Price { get; set; } // optional if you store price somewhere
    }
}
