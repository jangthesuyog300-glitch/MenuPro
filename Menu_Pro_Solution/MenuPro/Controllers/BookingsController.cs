using Hotel.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/bookings")]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _context;
    public BookingsController(AppDbContext context) => _context = context;

    // ✅ USER HISTORY
    [Authorize]
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUser(int userId)
    {
        var data = await _context.Bookings
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.BookingDate)
            .Select(b => new
            {
                b.BookingId,
                b.BookingDate,
                b.BookingStatus,
                b.BookingAmount,
                b.RestaurantId,
                b.TableId,
                b.TimeSlotId
            })
            .ToListAsync();

        return Ok(data);
    }

    // ✅ MANAGER: ALL BOOKINGS OF HIS RESTAURANT
    [Authorize(Roles = "Manager,Admin")]
    [HttpGet("restaurant/{restaurantId}")]
    public async Task<IActionResult> GetByRestaurant(int restaurantId)
    {
        var data = await _context.Bookings
            .Where(b => b.RestaurantId == restaurantId)
            .OrderByDescending(b => b.BookingDate)
            .Select(b => new
            {
                bookingId = b.BookingId,
                customerName = b.User.Name,
                customerPhone = b.User.Phone,
                bookingDate = b.BookingDate,
                guests = b.Table.Capacity, // if you store guests separately use that field
                tableNo = b.Table.TableNumber,
                status = b.BookingStatus,
                time = b.TimeSlot.StartTime + " - " + b.TimeSlot.EndTime,
                payment = _context.Payments
                    .Where(p => p.BookingId == b.BookingId)
                    .Select(p => p.PaymentStatus)
                    .FirstOrDefault() ?? "Unpaid"
            })
            .ToListAsync();

        return Ok(data);
    }

    // ✅ MANAGER: UPDATE STATUS
    [Authorize(Roles = "Manager,Admin")]
    [HttpPut("{bookingId}/status")]
    public async Task<IActionResult> UpdateStatus(int bookingId, [FromBody] string status)
    {
        var booking = await _context.Bookings.FindAsync(bookingId);
        if (booking == null) return NotFound("Booking not found");

        booking.BookingStatus = status; // "Pending" / "Confirmed" / "Cancelled"
        await _context.SaveChangesAsync();

        return Ok(new { booking.BookingId, booking.BookingStatus });
    }
}
