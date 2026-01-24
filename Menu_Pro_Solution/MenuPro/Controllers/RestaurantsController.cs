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
                    r.ImagePath          // ✅ SEND IMAGE
                })
                .ToListAsync();

            return Ok(restaurants);
        }

        // =========================================================
        // 🔵 USER + ADMIN – VIEW SINGLE RESTAURANT DETAILS
        // =========================================================
        [Authorize(Roles = "User,Admin")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRestaurantById(int id)
        {
            var restaurant = await _context.Restaurants
                .Include(r => r.Tables)
                .Include(r => r.FoodItems)
                .FirstOrDefaultAsync(r => r.RestaurantId == id && r.IsActive);

            if (restaurant == null)
                return NotFound("Restaurant not found");

            return Ok(restaurant);
        }

        // =========================================================
        // 🔴 ADMIN ONLY – CREATE RESTAURANT WITH IMAGE
        // =========================================================
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> CreateRestaurant(
            [FromForm] Restaurant restaurant,
            IFormFile? image)
        {
            // ✅ IMAGE UPLOAD
            if (image != null)
            {
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
                var extension = Path.GetExtension(image.FileName).ToLower();

                if (!allowedExtensions.Contains(extension))
                    return BadRequest("Only JPG, JPEG, PNG allowed");

                if (image.Length > 2 * 1024 * 1024)
                    return BadRequest("Image size must be less than 2MB");

                var folderPath = Path.Combine(_env.WebRootPath, "images/restaurants");

                if (!Directory.Exists(folderPath))
                    Directory.CreateDirectory(folderPath);

                var fileName = Guid.NewGuid() + extension;
                var filePath = Path.Combine(folderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

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

            return Ok(new
            {
                restaurant.RestaurantId,
                restaurant.Name,
                restaurant.IsActive
            });
        }
    }
}
