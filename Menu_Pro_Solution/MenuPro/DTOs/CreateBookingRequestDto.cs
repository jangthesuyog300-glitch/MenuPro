namespace MenuPro.DTOs
{
    public class CreateBookingRequestDto
    {
        public int RestaurantId { get; set; }
        public int TableId { get; set; }
        public int TimeSlotId { get; set; }
        public DateTime BookingDate { get; set; }

        // Order items (summary)
        public List<CreateBookingFoodItemDto> Items { get; set; } = new();
    }
}
