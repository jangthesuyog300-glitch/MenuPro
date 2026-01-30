namespace MenuPro.DTOs
{
    public class BookingHistoryDto
    {
        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public string BookingStatus { get; set; } = "";

        public decimal BookingAmount { get; set; }
        public decimal PaidAmount { get; set; }

        public int RestaurantId { get; set; }
        public string RestaurantName { get; set; } = "";

        public int TableId { get; set; }
        public int Guests { get; set; } // derived from Table.Seats

        public int TimeSlotId { get; set; }
        public string TimeSlotLabel { get; set; } = ""; // "16:00 - 18:00"

        public List<BookingFoodItemDto> FoodItems { get; set; } = new();
    }
}
