namespace MenuPro.DTOs
{
    public class ManagerSummaryDto
    {
        public int RestaurantId { get; set; }
        public string? RestaurantName { get; set; }
        public string? City { get; set; }
        public string? Location { get; set; }
        public decimal Rating { get; set; }
        public int TotalRatings { get; set; }
        public decimal PriceForTwo { get; set; }
        public string? OpenTime { get; set; }
        public string? CloseTime { get; set; }
        public string? ImagePath { get; set; }

        public int TotalFoodItems { get; set; }
        public int AvailableFoodItems { get; set; }
        public int OutOfStockFoodItems { get; set; }

        public int TotalTables { get; set; }
        public int AvailableTables { get; set; }
        public int BookedTables { get; set; }
        public int OtherStatusTables { get; set; }

        public int TodayBookings { get; set; }
        public int UpcomingBookings { get; set; }

        public decimal RevenueToday { get; set; }
        public decimal RevenueMonthToDate { get; set; }

        public DateTime GeneratedAtUtc { get; set; }
    }
}
