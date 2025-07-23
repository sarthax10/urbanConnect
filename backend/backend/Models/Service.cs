namespace backend.Models
{
    public class Service
    {
        public long ServiceId { get; set; }
        public string Name { get; set; } = null!;
        public string? Category { get; set; }
        public string? Description { get; set; }
        public int DurationMinutes { get; set; } = 60;
    }
}
