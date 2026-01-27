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

        
        [AllowAnonymous]
        [HttpGet("restaurant/{restaurantId}")]
        public async Task<IActionResult> GetByRestaurant(int restaurantId)
    => Ok(await _context.FoodItems
        .Where(f => f.RestaurantId == restaurantId && f.IsAvailable)
        .ToListAsync());

    }
}
