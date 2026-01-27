using Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [Authorize(Roles = "User,Admin")]
    [ApiController]
    [Route("api/bookingfoods")]
    public class BookingFoodsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BookingFoodsController(AppDbContext context) => _context = context;

        [HttpPost]
        public async Task<IActionResult> Add(BookingFood bookingFood)
        {
            _context.BookingFoods.Add(bookingFood);
            await _context.SaveChangesAsync();
            return Ok(bookingFood);
        }

        [HttpGet("booking/{bookingId}")]
        public async Task<IActionResult> GetByBooking(int bookingId)
            => Ok(await _context.BookingFoods
                .Where(bf => bf.BookingId == bookingId)
                .Include(bf => bf.FoodItem)
                .ToListAsync());
    }
}
