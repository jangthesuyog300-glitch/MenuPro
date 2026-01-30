namespace MenuPro.DTOs
{
    public class BookingFoodLineDto
    {
        public int FoodItemId { get; set; }
        public string FoodName { get; set; } = "";
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal LineTotal => Price * Quantity;
    }
}
