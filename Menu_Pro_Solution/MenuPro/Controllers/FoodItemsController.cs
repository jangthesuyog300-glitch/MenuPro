using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hotel.Models;
using MenuPro.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FoodItemsController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ GET: api/fooditems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FoodItem>>> GetAllFoodItems()
        {
            var foods = await _context.FoodItems
                .AsNoTracking()
                .OrderByDescending(f => f.FoodItemId)
                .ToListAsync();

            return Ok(foods);
        }

        // ✅ GET: api/fooditems/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<FoodItem>> GetFoodItemById(int id)
        {
            var food = await _context.FoodItems
                .AsNoTracking()
                .FirstOrDefaultAsync(f => f.FoodItemId == id);

            if (food == null) return NotFound($"FoodItem {id} not found.");
            return Ok(food);
        }

        // ✅ GET: api/fooditems/restaurant/3
        [HttpGet("restaurant/{restaurantId:int}")]
        public async Task<ActionResult<IEnumerable<FoodItem>>> GetFoodItemsByRestaurant(int restaurantId)
        {
            var foods = await _context.FoodItems
                .AsNoTracking()
                .Where(f => f.RestaurantId == restaurantId)
                .OrderByDescending(f => f.FoodItemId)
                .ToListAsync();

            return Ok(foods);
        }

        // ✅ POST: api/fooditems
        [HttpPost]
        public async Task<ActionResult<FoodItem>> CreateFoodItem([FromBody] FoodItemCreateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.FoodName))
                return BadRequest("FoodName is required.");

            if (dto.Price < 0)
                return BadRequest("Price cannot be negative.");

            // Optional: ensure restaurant exists
            var restaurantExists = await _context.Restaurants
                .AsNoTracking()
                .AnyAsync(r => r.RestaurantId == dto.RestaurantId && r.IsActive);

            if (!restaurantExists)
                return BadRequest($"Restaurant {dto.RestaurantId} not found or inactive.");

            var food = new FoodItem
            {
                RestaurantId = dto.RestaurantId,
                FoodName = dto.FoodName.Trim(),
                Price = dto.Price,
                IsAvailable = dto.IsAvailable
            };

            _context.FoodItems.Add(food);
            await _context.SaveChangesAsync();

            // returns 201 + created object
            return CreatedAtAction(nameof(GetFoodItemById), new { id = food.FoodItemId }, food);
        }

        // ✅ PUT: api/fooditems/5
        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateFoodItem(int id, [FromBody] FoodItemUpdateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.FoodName))
                return BadRequest("FoodName is required.");

            if (dto.Price < 0)
                return BadRequest("Price cannot be negative.");

            var food = await _context.FoodItems.FirstOrDefaultAsync(f => f.FoodItemId == id);
            if (food == null) return NotFound($"FoodItem {id} not found.");

            // Update fields
            food.FoodName = dto.FoodName.Trim();
            food.Price = dto.Price;
            food.IsAvailable = dto.IsAvailable;

            // If you want to allow changing restaurantId:
            // food.RestaurantId = dto.RestaurantId;

            await _context.SaveChangesAsync();
            return NoContent(); // 204
        }

        // ✅ DELETE: api/fooditems/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteFoodItem(int id)
        {
            var food = await _context.FoodItems.FirstOrDefaultAsync(f => f.FoodItemId == id);
            if (food == null) return NotFound($"FoodItem {id} not found.");

            // If food item is used in BookingFoods, deletion may fail due to FK Restrict.
            // You can block delete with a clear message:
            bool isUsed = await _context.BookingFoods
                .AsNoTracking()
                .AnyAsync(bf => bf.FoodItemId == id);

            if (isUsed)
                return Conflict("Cannot delete this item because it is already used in bookings.");

            _context.FoodItems.Remove(food);
            await _context.SaveChangesAsync();

            return NoContent(); // 204
        }
    }

    // ---------------- DTOs ----------------

  
}
