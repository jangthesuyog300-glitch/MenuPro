using Hotel.DTOs;
using Hotel.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (dto == null) return BadRequest("Invalid payload");

        if (string.IsNullOrWhiteSpace(dto.Name)) return BadRequest("Name is required");
        if (string.IsNullOrWhiteSpace(dto.Email)) return BadRequest("Email is required");
        if (string.IsNullOrWhiteSpace(dto.Phone)) return BadRequest("Phone is required");
        if (string.IsNullOrWhiteSpace(dto.Password)) return BadRequest("Password is required");

        var email = dto.Email.Trim().ToLowerInvariant();

        if (await _context.Users.AnyAsync(u => u.Email.ToLower() == email))
            return BadRequest("Email already exists");

        var role = string.IsNullOrWhiteSpace(dto.Role) ? "User" : dto.Role.Trim();

        if (role != "User" && role != "Manager" && role != "Admin")
            return BadRequest("Role must be 'User', 'Manager' or 'Admin'");

        // ✅ Manager/Admin must have RestaurantId
        if (role == "Manager" || role == "Admin")
        {
            if (dto.RestaurantId == null)
                return BadRequest("RestaurantId is required for Manager/Admin");
        }

        var user = new User
        {
            Name = dto.Name.Trim(),
            Email = email,
            Phone = dto.Phone.Trim(),
            Role = role,
            RestaurantId = dto.RestaurantId,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("User registered successfully");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        if (dto == null) return BadRequest("Invalid payload");
        if (string.IsNullOrWhiteSpace(dto.Email)) return BadRequest("Email is required");
        if (string.IsNullOrWhiteSpace(dto.Password)) return BadRequest("Password is required");

        var email = dto.Email.Trim().ToLowerInvariant();

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials");

        var token = GenerateJwtToken(user);

        // ✅ IMPORTANT: Return restaurantId here
        return Ok(new
        {
            token,
            userId = user.UserId,
            name = user.Name,
            role = user.Role,
            restaurantId = user.RestaurantId
        });
    }

    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role)
        };

        var keyString = _config["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key missing");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var expireMinutesStr = _config["Jwt:ExpireMinutes"] ?? "60";
        var expireMinutes = Convert.ToDouble(expireMinutesStr);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expireMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
