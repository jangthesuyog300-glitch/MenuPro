using Hotel.DTOs;
using Hotel.Models;
using MenuPro.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [ApiController]
    [Route("api/tables")]
    public class TablesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TablesController(AppDbContext context) => _context = context;

        // ✅ Only Admin can add tables
        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] Table table)
        {
            _context.Tables.Add(table);
            await _context.SaveChangesAsync();
            return Ok(table);
        }

        //Manager/Admin can view tables for a restaurant
        //Users can view tables to book


        [Authorize]
        [HttpGet("restaurant/{restaurantId}")]
        public async Task<IActionResult> GetByRestaurant(int restaurantId)
        {
            var tables = await _context.Tables
                .Where(t => t.RestaurantId == restaurantId)
                .Select(t => new
                {
                    id = t.TableId,
                    seats = t.Capacity,
                    status = t.Status
                })
                .ToListAsync();

            return Ok(tables);
        }
    }

}
