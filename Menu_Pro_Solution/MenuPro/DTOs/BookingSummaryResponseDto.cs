namespace MenuPro.DTOs
{
    public class BookingSummaryResponseDto
    {
        public int BookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public string BookingStatus { get; set; } = "";
        public decimal BookingAmount { get; set; }

        public int RestaurantId { get; set; }
        public int TableId { get; set; }
        public int TimeSlotId { get; set; }

        public List<BookingFoodLineDto> Items { get; set; } = new();
    }

}
