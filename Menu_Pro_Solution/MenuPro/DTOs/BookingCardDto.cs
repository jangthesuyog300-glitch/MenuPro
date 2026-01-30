namespace MenuPro.DTOs
{
    public class BookingCardDto
    {
        public int BookingId { get; set; }
        public string CustomerName { get; set; } = "";
        public string CustomerPhone { get; set; } = "";
        public DateTime BookingDate { get; set; }
        public string Time { get; set; } = "";
        public string TableNo { get; set; } = "";
        public string Status { get; set; } = "";
        public string Payment { get; set; } = "";
    }
}
