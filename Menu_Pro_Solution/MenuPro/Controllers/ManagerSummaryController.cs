using Hotel.Models;
using MenuPro.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MenuPro.Controllers
{
    [Authorize(Roles = "Admin,Manager")]
    [Route("api/[controller]")]
    [ApiController]
    public class ManagerSummaryController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ManagerSummaryController(AppDbContext db)
        {
            _db = db;
        }

        // ===== DTOs used only by this controller =====

        public class ManagerBookingWithMenuDto
        {
            public int BookingId { get; set; }
            public DateTime BookingDate { get; set; }

            public string CustomerName { get; set; } = "";
            public string CustomerPhone { get; set; } = "";

            public string Time { get; set; } = "";     // "16:00 - 18:00"
            public string TableNo { get; set; } = "";  // TableNumber

            public string Status { get; set; } = "";   // BookingStatus
            public string Payment { get; set; } = "";  // PaymentStatus

            public List<BookingFoodItemDto> FoodItems { get; set; } = new();
        }

        public class UpdateBookingStatusDto
        {
            public string Status { get; set; } = "";
        }

        // ===== GET SUMMARY =====
        // GET: /api/managersummary/{restaurantId}
        [HttpGet("{restaurantId:int}")]
        public async Task<ActionResult<ManagerSummaryDto>> GetSummary(int restaurantId)
        {
            // ---------- Restaurant ----------
            var restaurant = await _db.Restaurants
                .AsNoTracking()
                .Where(r => r.RestaurantId == restaurantId && r.IsActive)
                .Select(r => new
                {
                    r.RestaurantId,
                    r.Name,
                    r.City,
                    r.Location,
                    r.TotalRatings,
                    r.PriceForTwo,
                    r.OpenTime,    // string?
                    r.CloseTime,   // string?
                    r.ImagePath    // string?
                })
                .FirstOrDefaultAsync();

            if (restaurant == null)
                return NotFound($"Restaurant {restaurantId} not found or inactive.");

            var today = DateTime.UtcNow.Date;
            var monthStart = new DateTime(today.Year, today.Month, 1);

            // ---------- Food counts ----------
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
                .FirstOrDefaultAsync()
                ?? new { Total = 0, Available = 0, OutOfStock = 0 };

            // ---------- Table counts ----------
            var tableStatuses = await _db.Tables
                .AsNoTracking()
                .Where(t => t.RestaurantId == restaurantId)
                .Select(t => t.Status)
                .ToListAsync();

            int totalTables = tableStatuses.Count;
            int availableTables = tableStatuses.Count(s => (s ?? "").ToLower() == "available");
            int bookedTables = tableStatuses.Count(s => (s ?? "").ToLower() == "booked");
            int otherTables = totalTables - availableTables - bookedTables;

            // ---------- Bookings ----------
            var todayBookingsCount = await _db.Bookings
                .AsNoTracking()
                .Where(b => b.RestaurantId == restaurantId &&
                            b.BookingDate >= today &&
                            b.BookingDate < today.AddDays(1))
                .CountAsync();

            var upcomingBookingsCount = await _db.Bookings
                .AsNoTracking()
                .Where(b => b.RestaurantId == restaurantId &&
                            b.BookingDate >= DateTime.UtcNow)
                .CountAsync();

            // ---------- Revenue (FIXED EF QUERY) ----------
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

            // ---------- Recent bookings + menu ----------
            var recentBookings = await _db.Bookings
                .AsNoTracking()
                .Where(b => b.RestaurantId == restaurantId)
                .Include(b => b.User)
                .Include(b => b.Table)
                .Include(b => b.TimeSlot)
                .Include(b => b.Payments)
                .Include(b => b.BookingFoods)
                    .ThenInclude(bf => bf.FoodItem)
                .OrderByDescending(b => b.BookingDate)
                .Take(20)
                .Select(b => new ManagerBookingWithMenuDto
                {
                    BookingId = b.BookingId,
                    BookingDate = b.BookingDate,

                    CustomerName = b.User != null ? (b.User.Name ?? "Customer") : "Customer",
                    CustomerPhone = b.User != null ? (b.User.Phone ?? "") : "",

                    Time = b.TimeSlot != null
                        ? $"{b.TimeSlot.StartTime} - {b.TimeSlot.EndTime}"
                        : "",

                    TableNo = b.Table != null ? b.Table.TableNumber.ToString() : "",

                    Status = b.BookingStatus,

                    Payment = b.Payments
                        .OrderByDescending(p => p.PaymentDate)
                        .Select(p => p.PaymentStatus)
                        .FirstOrDefault() ?? "Unpaid",

                    FoodItems = b.BookingFoods
                        .Select(bf => new BookingFoodItemDto
                        {
                            FoodItemId = bf.FoodItemId,
                            Name = bf.FoodItem != null ? bf.FoodItem.FoodName : "",
                            Quantity = bf.Quantity,
                            Price = bf.Price
                        })
                        .ToList()
                })
                .ToListAsync();

            // ---------- Build DTO ----------
            var dto = new ManagerSummaryDto
            {
                RestaurantId = restaurant.RestaurantId,
                RestaurantName = restaurant.Name,
                City = restaurant.City ?? "",
                Location = restaurant.Location,
                TotalRatings = restaurant.TotalRatings,

                PriceForTwo = restaurant.PriceForTwo,
                OpenTime = restaurant.OpenTime ?? "",
                CloseTime = restaurant.CloseTime ?? "",
                ImagePath = restaurant.ImagePath ?? "",

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
                GeneratedAtUtc = DateTime.UtcNow,

                RecentBookings = recentBookings
            };

            return Ok(dto);
        }

        // ===== UPDATE BOOKING STATUS =====
        // PUT: /api/managersummary/bookings/{bookingId}/status
        [HttpPut("bookings/{bookingId:int}/status")]
        public async Task<IActionResult> UpdateBookingStatus(
            int bookingId,
            [FromBody] UpdateBookingStatusDto dto)
        {
            if (dto == null || string.IsNullOrWhiteSpace(dto.Status))
                return BadRequest("Status is required.");

            var booking = await _db.Bookings.FirstOrDefaultAsync(b => b.BookingId == bookingId);
            if (booking == null)
                return NotFound("Booking not found.");

            booking.BookingStatus = dto.Status.Trim();
            await _db.SaveChangesAsync();

            return NoContent();
        }
        */
    }
}
