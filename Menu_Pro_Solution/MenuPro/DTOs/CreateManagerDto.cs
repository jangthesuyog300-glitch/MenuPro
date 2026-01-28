namespace Hotel.DTOs
{
    public class CreateManagerDto
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int RestaurantId { get; set; }
    }
}
