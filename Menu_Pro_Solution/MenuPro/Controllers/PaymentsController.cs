using Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Razorpay;
using Razorpay.Api;

namespace Hotel.Controllers
{
   // [Authorize(Roles = "User,Admin")]
    [ApiController]
    [Route("api/payments")]
    public class PaymentsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public PaymentsController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // 🔹 STEP 1: Create Razorpay Order
        [HttpPost("create-order")]
        public IActionResult CreateOrder([FromBody] Hotel.Models.Payment payment)
        {
            string key = _configuration["Razorpay:Key"];
            string secret = _configuration["Razorpay:Secret"];

            RazorpayClient client = new RazorpayClient(key, secret);

            var options = new Dictionary<string, object>
            {
                { "amount", payment.Amount * 100 }, // amount in paise
                { "currency", "INR" },
                { "receipt", $"booking_{payment.BookingId}" }
            };

            var order = client.Order.Create(options);

            return Ok(new
            {
                orderId = order["id"].ToString(),
                amount = payment.Amount,
                key = key
            });
        }

        // 🔹 STEP 2: Save payment after success
        [HttpPost("success")]
        public async Task<IActionResult> Pay([FromBody] Hotel.Models.Payment payment)
        {
            payment.PaymentStatus = "Success";
            payment.PaymentType = "Razorpay";
            payment.PaymentDate = DateTime.UtcNow;

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return Ok(payment);
        }

        // 🔹 Get payments by booking
        [HttpGet("booking/{bookingId}")]
        public async Task<IActionResult> GetByBooking(int bookingId)
        {
            var payments = await _context.Payments
                .Where(p => p.BookingId == bookingId)
                .ToListAsync();

            return Ok(payments);
        }
    }
}