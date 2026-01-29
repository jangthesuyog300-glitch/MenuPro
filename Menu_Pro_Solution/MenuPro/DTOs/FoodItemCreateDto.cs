namespace MenuPro.DTOs
{
    public class FoodItemCreateDto
    {
        public int RestaurantId { get; set; }
        public string FoodName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; } = true;
    }
}
