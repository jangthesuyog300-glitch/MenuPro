using Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [Authorize(Roles = "User,Admin")]
    [ApiController]
    [Route("api/payments")]
    public class PaymentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public PaymentsController(AppDbContext context) => _context = context;

        [HttpPost]
        public async Task<IActionResult> Pay(Payment payment)
        {
            payment.PaymentStatus = "Success";
            payment.PaymentDate = DateTime.UtcNow;

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return Ok(payment);
        }

        [HttpGet("booking/{bookingId}")]
        public async Task<IActionResult> GetByBooking(int bookingId)
            => Ok(await _context.Payments
                .Where(p => p.BookingId == bookingId)
                .ToListAsync());
    }
}
