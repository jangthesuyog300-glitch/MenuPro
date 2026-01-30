using Hotel.Models;
using MenuPro.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// ✅ DTOs (keep in same file or move to DTO folder)


namespace Hotel.Controllers
{

    [ApiController]
    [Route("api/bookings")]
    public class BookingsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BookingsController(AppDbContext context) => _context = context;

        // ✅ NEW: CREATE BOOKING + SAVE ORDER SUMMARY (BookingFoods)
        // This is required because your React calls POST /api/bookings
        [Authorize(Roles = "User,Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBookingRequestDto req)
        {
            // ✅ Get UserId from JWT
            var userIdClaim = User.Claims.FirstOrDefault(c =>
                c.Type.EndsWith("/nameidentifier") || c.Type == "UserId");

            if (userIdClaim == null)
                return Unauthorized("UserId missing in token.");

            int userId = int.Parse(userIdClaim.Value);

            // ✅ Validate table belongs to restaurant
            var table = await _context.Tables
                .FirstOrDefaultAsync(t => t.TableId == req.TableId && t.RestaurantId == req.RestaurantId);

            if (table == null)
                return BadRequest("Invalid table for this restaurant.");

            // ✅ Load FoodItem prices from DB (use your exact names)
            var foodItemIds = req.Items.Select(i => i.FoodItemId).Distinct().ToList();

            var foodItems = await _context.FoodItems
                .Where(f => foodItemIds.Contains(f.FoodItemId))
                .Select(f => new { f.FoodItemId, f.FoodName, f.Price })
                .ToListAsync();

            if (foodItems.Count != foodItemIds.Count)
                return BadRequest("Invalid FoodItemId detected.");

            // ✅ Create booking
            var booking = new Booking
            {
                UserId = userId,
                RestaurantId = req.RestaurantId,
                TableId = req.TableId,
                TimeSlotId = req.TimeSlotId,
                BookingDate = req.BookingDate,
                BookingStatus = "Pending",
                BookingAmount = 0
            };

            // ✅ Add booking foods (order summary)
            decimal total = 0;

            foreach (var item in req.Items)
            {
                var food = foodItems.First(f => f.FoodItemId == item.FoodItemId);

                total += food.Price * item.Quantity;

                booking.BookingFoods.Add(new BookingFood
                {
                    FoodItemId = item.FoodItemId,
                    Quantity = item.Quantity,
                    Price = food.Price
                });
            }

            booking.BookingAmount = total;

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            // ✅ Return needed data to frontend
            return Ok(new
            {
                bookingId = booking.BookingId,
                bookingAmount = booking.BookingAmount
            });
        }

        // ✅ USER HISTORY (basic list)
        [Authorize]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            var data = await _context.Bookings
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.BookingDate)
                .Select(b => new
                {
                    b.BookingId,
                    b.BookingDate,
                    b.BookingStatus,
                    b.BookingAmount,
                    b.RestaurantId,
                    b.TableId,
                    b.TimeSlotId
                })
                .ToListAsync();

            return Ok(data);
        }

        // ✅ MANAGER: ALL BOOKINGS OF HIS RESTAURANT
        [Authorize(Roles = "Manager,Admin")]
        [HttpGet("restaurant/{restaurantId}")]
        public async Task<IActionResult> GetByRestaurant(int restaurantId)
        {
            var data = await _context.Bookings
                .Where(b => b.RestaurantId == restaurantId)
                .OrderByDescending(b => b.BookingDate)
                .Select(b => new
                {
                    bookingId = b.BookingId,
                    customerName = b.User.Name,
                    customerPhone = b.User.Phone,
                    bookingDate = b.BookingDate,
                    guests = b.Table.Capacity,
                    tableNo = b.Table.TableNumber,
                    status = b.BookingStatus,
                    time = b.TimeSlot.StartTime + " - " + b.TimeSlot.EndTime,
                    payment = _context.Payments
                        .Where(p => p.BookingId == b.BookingId)
                        .Select(p => p.PaymentStatus)
                        .FirstOrDefault() ?? "Unpaid"
                })
                .ToListAsync();

            return Ok(data);
        }

        // ✅ MANAGER: UPDATE STATUS
        [Authorize(Roles = "Manager,Admin")]
        [HttpPut("{bookingId}/status")]
        public async Task<IActionResult> UpdateStatus(int bookingId, [FromBody] string status)
        {
            var booking = await _context.Bookings.FindAsync(bookingId);
            if (booking == null) return NotFound("Booking not found");

            booking.BookingStatus = status;
            await _context.SaveChangesAsync();

            return Ok(new { booking.BookingId, booking.BookingStatus });
        }

        // ✅ BOOKING ORDER SUMMARY (BookingFoods + FoodItem)
        [Authorize]
        [HttpGet("{bookingId}/summary")]
        public async Task<IActionResult> GetBookingSummary(int bookingId)
        {
            var booking = await _context.Bookings
                .Where(b => b.BookingId == bookingId)
                .Select(b => new
                {
                    b.BookingId,
                    b.BookingDate,
                    b.BookingStatus,
                    b.BookingAmount,
                    b.RestaurantId,
                    b.TableId,
                    b.TimeSlotId,

                    items = _context.BookingFoods
                        .Where(bf => bf.BookingId == b.BookingId)
                        .Select(bf => new
                        {
                            bf.BookingFoodId,
                            bf.FoodItemId,
                            foodName = bf.FoodItem.FoodName,
                            bf.Quantity,
                            bf.Price,
                            lineTotal = bf.Price * bf.Quantity
                        })
                        .ToList(),

                    payment = _context.Payments
                        .Where(p => p.BookingId == b.BookingId)
                        .Select(p => p.PaymentStatus)
                        .FirstOrDefault() ?? "Unpaid"
                })
                .FirstOrDefaultAsync();

            if (booking == null) return NotFound("Booking not found");

            return Ok(booking);
        }

    }
}
