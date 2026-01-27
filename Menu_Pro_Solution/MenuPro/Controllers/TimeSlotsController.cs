using Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [ApiController]
    [Route("api/timeslots")]
    public class TimeSlotsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TimeSlotsController(AppDbContext context) => _context = context;

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Add(TimeSlot slot)
        {
            _context.TimeSlots.Add(slot);
            await _context.SaveChangesAsync();
            return Ok(slot);
        }

        [Authorize(Roles = "User,Admin")]
        [HttpGet]
        public async Task<IActionResult> GetAll()
            => Ok(await _context.TimeSlots.ToListAsync());
    }
}
