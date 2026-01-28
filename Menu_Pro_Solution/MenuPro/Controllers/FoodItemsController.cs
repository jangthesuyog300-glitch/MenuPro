using Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [ApiController]
    [Route("api/fooditems")]
    public class FoodItemsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public FoodItemsController(AppDbContext context) => _context = context;

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Add(FoodItem food)
        {
            _context.FoodItems.Add(food);
            await _context.SaveChangesAsync();
            return Ok(food);
        }


        [Authorize(Roles = "Manager,Admin")]
        [HttpGet("restaurant/{restaurantId}")]
        public async Task<IActionResult> GetByRestaurant(int restaurantId)
        {
            var data = await _context.FoodItems
                .Where(f => f.RestaurantId == restaurantId)
                .Select(f => new
                {
                    id = f.FoodItemId,
                    name = f.FoodName,
                    price = f.Price,
                    available = f.IsAvailable
                })
                .ToListAsync();

            return Ok(data);
        }

    }
}
