using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Hotel.Models;
using System.Security.Claims;

namespace Hotel.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HistoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public HistoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/history/{userId}
        [HttpGet("{userId:int}")]
        public async Task<IActionResult> GetUserHistory(int userId)
        {
            var tokenUserId =
                User.FindFirstValue(ClaimTypes.NameIdentifier) ??
                User.FindFirstValue("sub");

            if (!int.TryParse(tokenUserId, out var loggedInUserId) || loggedInUserId != userId)
                return Forbid("You are not allowed to access this history.");

            var history = await _context.Bookings
                .AsNoTracking()
                .Where(b => b.UserId == userId)
                .Include(b => b.Restaurant)
                .Include(b => b.Table)
                .Include(b => b.TimeSlot)
                .Include(b => b.BookingFoods)
                    .ThenInclude(bf => bf.FoodItem)
                .Include(b => b.Payments)
                .OrderByDescending(b => b.BookingDate)
                .Select(b => new
                {
                    bookingId = b.BookingId,
                    bookingDate = b.BookingDate,
                    bookingStatus = b.BookingStatus,

                    restaurantName = b.Restaurant.Name,
                    guests = b.Table.Capacity,
                    timeSlot = b.TimeSlot.StartTime + " - " + b.TimeSlot.EndTime,

                    bookingAmount = b.BookingAmount,

                    // ✅ FIXED: EF-safe sum
                    paidAmount = b.Payments
                        .Where(p => p.PaymentStatus == "Success" || p.PaymentStatus == "Paid")
                        .Sum(p => (decimal?)p.Amount) ?? 0m,

                    foodItems = b.BookingFoods.Select(bf => new
                    {
                        foodItemId = bf.FoodItemId,
                        name = bf.FoodItem.FoodName,
                        quantity = bf.Quantity
                    }).ToList()
                })
                .ToListAsync();

            return Ok(history);
        }
    }
}
