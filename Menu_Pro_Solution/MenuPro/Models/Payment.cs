namespace Hotel.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }

        public int BookingId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentType { get; set; } = "Combined"; // Table/Food
        public string PaymentStatus { get; set; } = "Pending";
        public DateTime PaymentDate { get; set; }

        // Navigation
        public Booking Booking { get; set; } = null!;
    }

}
