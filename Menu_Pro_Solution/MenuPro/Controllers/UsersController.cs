using Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{

    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context) => _context = context;

        // IMPORTANT:
        // Do NOT expose a second "register" here because it would bypass hashing.
        // Registration should ONLY happen via /api/auth/register.

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _context.Users.AsNoTracking().ToListAsync());

        // ✅ DTO for updating selected restaurant
        public class SetRestaurantDto
        {
            public int RestaurantId { get; set; }
        }

        // ✅ Save clicked restaurantId into DB for CURRENT logged-in user
        // Frontend call: PUT /api/users/me/restaurant  body: { "restaurantId": 1 }
        [Authorize]
        [HttpPut("me/restaurant")]
        public async Task<IActionResult> SetMyRestaurant([FromBody] SetRestaurantDto dto)
        {
            // get userId from token
            var userIdClaim = User.Claims.FirstOrDefault(c =>
                c.Type.EndsWith("/nameidentifier") || c.Type == "UserId");

            if (userIdClaim == null)
                return Unauthorized("UserId missing in token.");

            int userId = int.Parse(userIdClaim.Value);

            // validate restaurant exists
            var exists = await _context.Restaurants
                .AnyAsync(r => r.RestaurantId == dto.RestaurantId);

            if (!exists)
                return BadRequest("Invalid RestaurantId");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            if (user == null)
                return NotFound("User not found");

            // optional safety: prevent manager reassignment by click
            if (user.Role == "Manager")
                return BadRequest("Manager restaurant cannot be changed.");

            user.RestaurantId = dto.RestaurantId;
            await _context.SaveChangesAsync();

            return Ok(new { userId = user.UserId, restaurantId = user.RestaurantId });
        }
    }
}
