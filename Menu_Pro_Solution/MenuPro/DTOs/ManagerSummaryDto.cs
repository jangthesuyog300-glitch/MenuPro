// ==============================
// File: DTOs/ManagerSummaryDto.cs
// ==============================
using System;
using System.Collections.Generic;
using static MenuPro.Controllers.ManagerSummaryController;

namespace MenuPro.DTOs
{
    public class ManagerSummaryDto
    {
        // Restaurant info
        public int RestaurantId { get; set; }
        public string RestaurantName { get; set; } = "";
        public string City { get; set; } = "";
        public string Location { get; set; } = "";
        public int TotalRatings { get; set; }

        // ✅ Your required properties
        public decimal PriceForTwo { get; set; }
        public string OpenTime { get; set; } = "";
        public string CloseTime { get; set; } = "";
        public string ImagePath { get; set; } = "";

        // Food summary
        public int TotalFoodItems { get; set; }
        public int AvailableFoodItems { get; set; }
        public int OutOfStockFoodItems { get; set; }

        // Tables summary
        public int TotalTables { get; set; }
        public int AvailableTables { get; set; }
        public int BookedTables { get; set; }
        public int OtherStatusTables { get; set; }

        // Bookings summary
        public int TodayBookings { get; set; }
        public int UpcomingBookings { get; set; }

        // Revenue summary
        public decimal RevenueToday { get; set; }
        public decimal RevenueMonthToDate { get; set; }

        public DateTime GeneratedAtUtc { get; set; }

        // ✅ Recent bookings list for manager UI
        public List<ManagerBookingWithMenuDto> RecentBookings { get; set; } = new();
    }
}
