using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingFoodsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BookingFoodsController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET: api/bookingfoods/booking/10
        [HttpGet("booking/{bookingId:int}")]
        public async Task<ActionResult<IEnumerable<BookingFood>>> GetFoodsByBooking(int bookingId)
        {
            var items = await _context.BookingFoods
                .AsNoTracking()
                .Where(bf => bf.BookingId == bookingId)
                .Include(bf => bf.FoodItem)
                .ToListAsync();

            return Ok(items);
        }

        // ✅ POST: api/bookingfoods
        // Body: { bookingId, foodItemId, quantity }
        [HttpPost]
        public async Task<ActionResult<BookingFood>> AddFoodToBooking([FromBody] BookingFoodCreateDto dto)
        {
            if (dto.Quantity <= 0)
                return BadRequest("Quantity must be greater than 0.");

            // Ensure booking exists
            var bookingExists = await _context.Bookings
                .AsNoTracking()
                .AnyAsync(b => b.BookingId == dto.BookingId);

            if (!bookingExists)
                return BadRequest($"Booking {dto.BookingId} not found.");

            // Get food item (to copy price)
            var food = await _context.FoodItems
                .AsNoTracking()
                .FirstOrDefaultAsync(f => f.FoodItemId == dto.FoodItemId);

            if (food == null)
                return BadRequest($"FoodItem {dto.FoodItemId} not found.");

            if (!food.IsAvailable)
                return BadRequest("This food item is out of stock.");

            // If same food already exists in booking -> increase quantity
            var existing = await _context.BookingFoods
                .FirstOrDefaultAsync(x => x.BookingId == dto.BookingId && x.FoodItemId == dto.FoodItemId);

            if (existing != null)
            {
                existing.Quantity += dto.Quantity;
                existing.Price = food.Price; // keep updated unit price
                await _context.SaveChangesAsync();
                return Ok(existing);
            }

            var bookingFood = new BookingFood
            {
                BookingId = dto.BookingId,
                FoodItemId = dto.FoodItemId,
                Quantity = dto.Quantity,
                Price = food.Price // ✅ unit price copied from FoodItem
            };

            _context.BookingFoods.Add(bookingFood);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFoodsByBooking), new { bookingId = dto.BookingId }, bookingFood);
        }

        // ✅ PUT: api/bookingfoods/5
        [HttpPut("{bookingFoodId:int}")]
        public async Task<IActionResult> UpdateBookingFood(int bookingFoodId, [FromBody] BookingFoodUpdateDto dto)
        {
            if (dto.Quantity <= 0)
                return BadRequest("Quantity must be greater than 0.");

            var bf = await _context.BookingFoods.FirstOrDefaultAsync(x => x.BookingFoodId == bookingFoodId);
            if (bf == null) return NotFound("BookingFood not found.");

            bf.Quantity = dto.Quantity;

            // Optional: allow price override
            if (dto.Price > 0)
                bf.Price = dto.Price;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // ✅ DELETE: api/bookingfoods/5
        [HttpDelete("{bookingFoodId:int}")]
        public async Task<IActionResult> DeleteBookingFood(int bookingFoodId)
        {
            var bf = await _context.BookingFoods.FirstOrDefaultAsync(x => x.BookingFoodId == bookingFoodId);
            if (bf == null) return NotFound("BookingFood not found.");

            _context.BookingFoods.Remove(bf);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }