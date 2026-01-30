using Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [Authorize(Roles = "Admin,Manager")]
    [ApiController]
    [Route("api/payments")]
    public class PaymentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PaymentsController(AppDbContext context) => _context = context;

        // ✅ DTO to avoid naming conflicts / overposting
        public class CreatePaymentDto
        {
            public int BookingId { get; set; }
            public decimal Amount { get; set; }
            public string PaymentType { get; set; } = "RazorpayDemo"; // ✅ matches your projection (PaymentType)
        }

        [HttpPost]
        public async Task<IActionResult> Pay([FromBody] CreatePaymentDto dto)
        {
            // ✅ Validate booking exists
            var bookingExists = await _context.Bookings.AnyAsync(b => b.BookingId == dto.BookingId);
            if (!bookingExists) return BadRequest("Invalid BookingId");

            var payment = new Payment
            {
                BookingId = dto.BookingId,
                Amount = dto.Amount,
                PaymentType = dto.PaymentType,     // ✅ use PaymentType (not paymentMethod)
                PaymentStatus = "Success",
                PaymentDate = DateTime.UtcNow
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return Ok(payment);
        }

        [HttpGet("booking/{bookingId}")]
        public async Task<IActionResult> GetByBooking(int bookingId)
            => Ok(await _context.Payments
                .Where(p => p.BookingId == bookingId)
                .ToListAsync());

        [Authorize(Roles = "Manager,Admin")] // ✅ manager dashboard needs access
        [HttpGet("restaurant/{restaurantId}")]
        public async Task<IActionResult> GetByRestaurant(int restaurantId)
        {
            var data = await _context.Payments
                .Where(p => p.Booking.RestaurantId == restaurantId)
                .OrderByDescending(p => p.PaymentDate)
                .Select(p => new
                {
                    id = p.PaymentId,
                    bookingId = p.BookingId,
                    customer = p.Booking.User.Name,
                    amount = p.Amount,
                    method = p.PaymentType,
                    status = p.PaymentStatus,
                    date = p.PaymentDate
                })
                .ToListAsync();

            return Ok(data);
        }
    }
}
