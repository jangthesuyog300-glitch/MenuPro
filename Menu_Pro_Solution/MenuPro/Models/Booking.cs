using Razorpay.Api;

namespace Hotel.Models
{
    public class Booking
    {
        public int BookingId { get; set; }

        public int UserId { get; set; }
        public int RestaurantId { get; set; }
        public int TableId { get; set; }
        public int TimeSlotId { get; set; }

        public DateTime BookingDate { get; set; }
        public string BookingStatus { get; set; } = "Pending";
        public decimal BookingAmount { get; set; }

        // Navigation
        public User User { get; set; } = null!;
        public Restaurant Restaurant { get; set; } = null!;
        public Table Table { get; set; } = null!;
        public TimeSlot TimeSlot { get; set; } = null!;

        public ICollection<BookingFood> BookingFoods { get; set; } = new List<BookingFood>();
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();
    }

}
