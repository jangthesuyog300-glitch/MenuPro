using Hotel.Models;
using MenuPro.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MenuPro.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [Authorize(Roles = "Manager")] // enable if you have auth + roles
    public class ManagerSummaryController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ManagerSummaryController(AppDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// Dashboard summary for a restaurant manager.
        /// </summary>
        /// <param name="restaurantId">Restaurant Id</param>
        [HttpGet("{restaurantId:int}")]
        public async Task<ActionResult<ManagerSummaryDto>> GetSummary(int restaurantId)
        {
            // Restaurant basic info
            var restaurant = await _db.Restaurants
                .AsNoTracking()
                .Where(r => r.RestaurantId == restaurantId && r.IsActive)
                .Select(r => new
                {
                    r.RestaurantId,
                    r.Name,
                    r.City,
                    r.Location,
                    r.Rating,
                    r.TotalRatings,
                    r.PriceForTwo,
                    r.OpenTime,
                    r.CloseTime,
                    r.ImagePath
                })
                .FirstOrDefaultAsync();

            if (restaurant == null)
                return NotFound($"Restaurant {restaurantId} not found or inactive.");

            var today = DateTime.UtcNow.Date;
            var monthStart = new DateTime(today.Year, today.Month, 1);

            // Food counts
            var foodTotals = await _db.FoodItems
                .AsNoTracking()
                .Where(f => f.RestaurantId == restaurantId)
                .GroupBy(_ => 1)
                .Select(g => new
                {
                    Total = g.Count(),
                    Available = g.Count(x => x.IsAvailable),
                    OutOfStock = g.Count(x => !x.IsAvailable)
                })
                .FirstOrDefaultAsync() ?? new { Total = 0, Available = 0, OutOfStock = 0 };

            // Table counts
            // (Assuming Table has Status string: "Available", "Booked", etc.)
            var tables = await _db.Tables
                .AsNoTracking()
                .Where(t => t.RestaurantId == restaurantId)
                .Select(t => t.Status)
                .ToListAsync();

            int totalTables = tables.Count;
            int availableTables = tables.Count(s => (s ?? "").ToLower() == "available");
            int bookedTables = tables.Count(s => (s ?? "").ToLower() == "booked");
            int otherTables = totalTables - availableTables - bookedTables;

            // Bookings today + upcoming
            // (Assuming Booking has BookingDate DateTime and BookingStatus string)
            var todayBookingsCount = await _db.Bookings
                .AsNoTracking()
                .Where(b => b.RestaurantId == restaurantId && b.BookingDate >= today && b.BookingDate < today.AddDays(1))
                .CountAsync();

            var upcomingBookingsCount = await _db.Bookings
                .AsNoTracking()
                .Where(b => b.RestaurantId == restaurantId && b.BookingDate >= DateTime.UtcNow)
                .CountAsync();

            // Revenue today + month-to-date (from payments)
            // (Assuming Payment has Amount decimal and PaymentDate DateTime, PaymentStatus string)
            var revenueToday = await _db.Payments
                .AsNoTracking()
                .Where(p =>
                    p.Booking != null &&
                    p.Booking.RestaurantId == restaurantId &&
                    p.PaymentDate >= today &&
                    p.PaymentDate < today.AddDays(1) &&
                    (p.PaymentStatus ?? "").ToLower() == "success"
                )
                .SumAsync(p => (decimal?)p.Amount) ?? 0m;

            var revenueMonth = await _db.Payments
                .AsNoTracking()
                .Where(p =>
                    p.Booking != null &&
                    p.Booking.RestaurantId == restaurantId &&
                    p.PaymentDate >= monthStart &&
                    p.PaymentDate < monthStart.AddMonths(1) &&
                    (p.PaymentStatus ?? "").ToLower() == "success"
                )
                .SumAsync(p => (decimal?)p.Amount) ?? 0m;

            // Build response
            var dto = new ManagerSummaryDto
            {
                RestaurantId = restaurant.RestaurantId,
                RestaurantName = restaurant.Name,
                City = restaurant.City,
                Location = restaurant.Location,
               // Rating = restaurant.Rating,
                TotalRatings = restaurant.TotalRatings,
                PriceForTwo = restaurant.PriceForTwo,
                OpenTime = restaurant.OpenTime,
                CloseTime = restaurant.CloseTime,
                ImagePath = restaurant.ImagePath,

                TotalFoodItems = foodTotals.Total,
                AvailableFoodItems = foodTotals.Available,
                OutOfStockFoodItems = foodTotals.OutOfStock,

                TotalTables = totalTables,
                AvailableTables = availableTables,
                BookedTables = bookedTables,
                OtherStatusTables = otherTables,

                TodayBookings = todayBookingsCount,
                UpcomingBookings = upcomingBookingsCount,

                RevenueToday = revenueToday,
                RevenueMonthToDate = revenueMonth,
                GeneratedAtUtc = DateTime.UtcNow
            };

            return Ok(dto);
        }

        // OPTIONAL: if manager login has restaurantId, you can provide:
        // GET api/managersummary/me
        // This needs JWT claim or DB lookup by UserId.
        /*
        [HttpGet("me")]
        [Authorize(Roles = "Manager")]
        public async Task<ActionResult<ManagerSummaryDto>> GetMySummary()
        {
            int restaurantId = await ResolveRestaurantIdForManager();
            return await GetSummary(restaurantId);
        }

        private async Task<int> ResolveRestaurantIdForManager()
        {
            // Example if you store userId in claims:
            // var userId = int.Parse(User.FindFirst("userId")!.Value);
            // var user = await _db.Users.AsNoTracking().FirstAsync(u => u.UserId == userId);
            // return user.RestaurantId ?? throw new Exception("Manager has no restaurant mapped.");

            throw new NotImplementedException("Implement based on your auth/user model.");
        }
        */
    }
}
