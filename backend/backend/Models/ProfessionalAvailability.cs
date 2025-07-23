namespace backend.Models
{
    public class ProfessionalAvailability
    {
        public long AvailabilityId { get; set; }
        public long ProfessionalId { get; set; } // FK to User
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsBooked { get; set; }
    }
}
