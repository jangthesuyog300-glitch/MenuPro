namespace MenuPro.DTOs
{
    public class FoodItemUpdateDto
    {
        // If you want to change restaurantId while updating, add RestaurantId here too
        public string FoodName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
    }
}
