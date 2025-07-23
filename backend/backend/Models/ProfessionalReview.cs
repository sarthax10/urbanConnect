namespace backend.Models
{
    public class ProfessionalReview
    {
        public long ReviewId { get; set; }
        public long BookingId { get; set; }
        public int Rating { get; set; } // 1 to 5
        public string? Comment { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
