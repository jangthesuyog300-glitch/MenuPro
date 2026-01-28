using Hotel.DTOs;
using Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;
        public AdminController(AppDbContext context) => _context = context;

        // ✅ LIST MANAGERS
        // GET: /api/admin/managers
        [HttpGet("managers")]
        public async Task<IActionResult> GetManagers()
        {
            var managers = await _context.Users
                .Where(u => u.Role == "Manager")
                .OrderByDescending(u => u.UserId)
                .Select(u => new
                {
                    userId = u.UserId,
                    name = u.Name,
                    email = u.Email,
                    phone = u.Phone,
                    role = u.Role,
                    restaurantId = u.RestaurantId
                })
                .ToListAsync();

            return Ok(managers);
        }

        // ✅ CREATE MANAGER
        // POST: /api/admin/managers
        [HttpPost("managers")]
        public async Task<IActionResult> CreateManager([FromBody] CreateManagerDto dto)
        {
            if (dto == null) return BadRequest("Invalid payload");
            if (string.IsNullOrWhiteSpace(dto.Name)) return BadRequest("Name is required");
            if (string.IsNullOrWhiteSpace(dto.Email)) return BadRequest("Email is required");
            if (string.IsNullOrWhiteSpace(dto.Phone)) return BadRequest("Phone is required");
            if (string.IsNullOrWhiteSpace(dto.Password)) return BadRequest("Password is required");
            if (dto.RestaurantId <= 0) return BadRequest("RestaurantId is required");

            var email = dto.Email.Trim().ToLowerInvariant();

            // Restaurant exists?
            var restaurantExists = await _context.Restaurants.AnyAsync(r => r.RestaurantId == dto.RestaurantId);
            if (!restaurantExists) return BadRequest("Restaurant not found");

            // Email unique?
            var emailExists = await _context.Users.AnyAsync(u => u.Email.ToLower() == email);
            if (emailExists) return BadRequest("Email already exists");

            var manager = new User
            {
                Name = dto.Name.Trim(),
                Email = email,
                Phone = dto.Phone.Trim(),
                Role = "Manager",
                RestaurantId = dto.RestaurantId,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            _context.Users.Add(manager);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                userId = manager.UserId,
                name = manager.Name,
                email = manager.Email,
                phone = manager.Phone,
                role = manager.Role,
                restaurantId = manager.RestaurantId
            });
        }

        // ✅ DELETE MANAGER
        // DELETE: /api/admin/managers/{id}
        [HttpDelete("managers/{id}")]
        public async Task<IActionResult> DeleteManager(int id)
        {
            var manager = await _context.Users.FirstOrDefaultAsync(u => u.UserId == id && u.Role == "Manager");
            if (manager == null) return NotFound("Manager not found");

            _context.Users.Remove(manager);
            await _context.SaveChangesAsync();

            return Ok("Manager deleted");
        }

        // ✅ LIST RESTAURANTS (for dropdown + admin page)
        // GET: /api/admin/restaurants
        [HttpGet("restaurants")]
        public async Task<IActionResult> GetRestaurants()
        {
            var data = await _context.Restaurants
                .OrderByDescending(r => r.RestaurantId)
                .Select(r => new
                {
                    restaurantId = r.RestaurantId,
                    name = r.Name,
                    city = r.City,
                    location = r.Location,
                    isActive = r.IsActive
                })
                .ToListAsync();

            return Ok(data);
        }

        // ✅ NEW: TOGGLE RESTAURANT ACTIVE/INACTIVE
        // PUT: /api/admin/restaurants/{id}/toggle
        [HttpPut("restaurants/{id}/toggle")]
        public async Task<IActionResult> ToggleRestaurantStatus(int id)
        {
            var restaurant = await _context.Restaurants.FirstOrDefaultAsync(r => r.RestaurantId == id);
            if (restaurant == null) return NotFound("Restaurant not found");

            restaurant.IsActive = !restaurant.IsActive;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                restaurantId = restaurant.RestaurantId,
                isActive = restaurant.IsActive
            });
        }

        // ✅ Admin Dashboard stats
        // GET: /api/admin/stats
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var restaurants = await _context.Restaurants.CountAsync();
            var managers = await _context.Users.CountAsync(u => u.Role == "Manager");
            var active = await _context.Restaurants.CountAsync(r => r.IsActive);
            var inactive = await _context.Restaurants.CountAsync(r => !r.IsActive);

            return Ok(new { restaurants, managers, active, inactive });
        }
    }
}
