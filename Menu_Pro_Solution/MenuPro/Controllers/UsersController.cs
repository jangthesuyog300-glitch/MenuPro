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
    }
}
