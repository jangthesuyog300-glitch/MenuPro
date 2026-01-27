using Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [ApiController]
    [Route("api/restaurants")]
    public class RestaurantsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _env;

        public RestaurantsController(AppDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // =========================================================
        // 🟢 PUBLIC API – HOME PAGE (NO LOGIN REQUIRED)
        // =========================================================
        [AllowAnonymous]
        [HttpGet("public")]
        public async Task<IActionResult> GetActiveRestaurants()
        {
            var restaurants = await _context.Restaurants
                .Where(r => r.IsActive)
                .Select(r => new
                {
                    r.RestaurantId,
                    r.Name,
                    r.Location,
                    r.Rating,
                    r.IsActive,
                    r.ImagePath
                })
                .ToListAsync();

            return Ok(restaurants);
        }

        // =========================================================
        // 🟢 PUBLIC API – RESTAURANT DETAILS (NO LOGIN REQUIRED) ✅ FIX
        // =========================================================
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRestaurantById(int id)
        {
            var restaurant = await _context.Restaurants
                .Where(r => r.RestaurantId == id && r.IsActive)
                .Select(r => new
                {
                    r.RestaurantId,
                    r.Name,
                    r.Description,
                    r.Location,
                    r.City,
                    r.Rating,
                    r.TotalRatings,
                    r.PriceForTwo,
                    r.OpenTime,
                    r.CloseTime,
                    r.Phone,
                    r.ImagePath,

                    // ✅ No Restaurant navigation inside tables
                    Tables = r.Tables.Select(t => new
                    {
                        t.TableId,
                        t.RestaurantId,
                        t.TableNumber,
                        t.Capacity,
                        t.Status
                    }).ToList(),

                    // ✅ No Restaurant navigation inside food items
                    FoodItems = r.FoodItems.Select(f => new
                    {
                        f.FoodItemId,
                        f.RestaurantId,
                        f.FoodName,
                        f.Price,
                        f.IsAvailable
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (restaurant == null)
                return NotFound("Restaurant not found");

            return Ok(restaurant);
        }


        // =========================================================
        // 🔴 ADMIN ONLY – CREATE RESTAURANT WITH IMAGE
        // =========================================================
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateRestaurant([FromForm] Restaurant restaurant, IFormFile? image)
        {
            if (image != null)
            {
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
                var extension = Path.GetExtension(image.FileName).ToLowerInvariant();

                if (!allowedExtensions.Contains(extension))
                    return BadRequest("Only JPG, JPEG, PNG allowed");

                if (image.Length > 2 * 1024 * 1024)
                    return BadRequest("Image size must be less than 2MB");

                var folderPath = Path.Combine(_env.WebRootPath, "images/restaurants");
                if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);

                var fileName = Guid.NewGuid() + extension;
                var filePath = Path.Combine(folderPath, fileName);

                using var stream = new FileStream(filePath, FileMode.Create);
                await image.CopyToAsync(stream);

                restaurant.ImagePath = "/images/restaurants/" + fileName;
            }

            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();

            return Ok(restaurant);
        }

        // =========================================================
        // 🔴 ADMIN ONLY – GET ALL RESTAURANTS
        // =========================================================
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllRestaurants()
        {
            return Ok(await _context.Restaurants.ToListAsync());
        }

        // =========================================================
        // 🔴 ADMIN ONLY – ACTIVATE / DEACTIVATE RESTAURANT
        // =========================================================
        [Authorize(Roles = "Admin")]
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateRestaurantStatus(int id, bool isActive)
        {
            var restaurant = await _context.Restaurants.FindAsync(id);
            if (restaurant == null)
                return NotFound("Restaurant not found");

            restaurant.IsActive = isActive;
            await _context.SaveChangesAsync();

            return Ok(new { restaurant.RestaurantId, restaurant.Name, restaurant.IsActive });
        }
    }
}
