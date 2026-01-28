namespace Hotel.DTOs
{
    public class CreateRestaurantDto
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public string Location { get; set; } = null!;
        public string City { get; set; } = null!;
        public double Rating { get; set; } = 0;
        public int TotalRatings { get; set; } = 0;
        public bool IsActive { get; set; } = true;
        public int PriceForTwo { get; set; } = 0;
        public string? OpenTime { get; set; }
        public string? CloseTime { get; set; }
        public string? Phone { get; set; }
        public string? ImagePath { get; set; } // optional
    }
}
