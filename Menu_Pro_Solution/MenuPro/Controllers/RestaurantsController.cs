using Hotel.DTOs;
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
        //  PUBLIC API – HOME PAGE (NO LOGIN REQUIRED)
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

       
        [AllowAnonymous] // public details (optional)
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

                    Tables = r.Tables.Select(t => new
                    {
                        t.TableId,
                        t.TableNumber,
                        t.Capacity,
                        t.Status
                    }).ToList(),

                    FoodItems = r.FoodItems.Select(f => new
                    {
                        f.FoodItemId,
                        f.FoodName,
                        f.Price,
                        f.IsAvailable
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (restaurant == null) return NotFound("Restaurant not found");
            return Ok(restaurant);
        }



        // =========================================================
        //  ADMIN ONLY – CREATE RESTAURANT WITH IMAGE
        // =========================================================
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRestaurantDto dto)
        {
            var restaurant = new Restaurant
            {
                Name = dto.Name,
                Description = dto.Description,
                Location = dto.Location,
                City = dto.City,
                Rating = dto.Rating,
                TotalRatings = dto.TotalRatings,
                IsActive = dto.IsActive,
                PriceForTwo = dto.PriceForTwo,
                OpenTime = dto.OpenTime,
                CloseTime = dto.CloseTime,
                Phone = dto.Phone,
                ImagePath = dto.ImagePath
            };

            _context.Restaurants.Add(restaurant);
            await _context.SaveChangesAsync();
            return Ok(restaurant);
        }


        // =========================================================
        //  ADMIN ONLY – GET ALL RESTAURANTS
        // =========================================================
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAllRestaurants()
        {
            return Ok(await _context.Restaurants.ToListAsync());
        }

        // =========================================================
        //  ADMIN ONLY – ACTIVATE / DEACTIVATE RESTAURANT
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
