using Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/timeslots")]
public class TimeSlotsController : ControllerBase
{
    private readonly AppDbContext _context;
    public TimeSlotsController(AppDbContext context) => _context = context;

    // ✅ PUBLIC – NO LOGIN REQUIRED
    [HttpGet("restaurant/{restaurantId}")]
    public async Task<IActionResult> GetByRestaurant(int restaurantId)
    {
        var restaurant = await _context.Restaurants
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.RestaurantId == restaurantId);

        if (restaurant == null)
            return NotFound("Restaurant not found");

        var open = TimeSpan.Parse(restaurant.OpenTime ?? "");
        var close = TimeSpan.Parse(restaurant.CloseTime ?? "");

        if (close <= open)
            close = close.Add(TimeSpan.FromHours(24));

        var slots = new List<object>();
        int id = 1;

        for (var start = open; start.Add(TimeSpan.FromHours(2)) <= close; start += TimeSpan.FromHours(2))
        {
            slots.Add(new
            {
                timeSlotId = id++,
                startTime = start.ToString(@"hh\:mm"),
                endTime = start.Add(TimeSpan.FromHours(2)).ToString(@"hh\:mm")
            });
        }

        return Ok(slots);
    }
}
