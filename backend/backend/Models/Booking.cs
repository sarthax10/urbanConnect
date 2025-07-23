namespace backend.Models
{
    public class Booking
    {
        public long BookingId { get; set; }
        public long UserId { get; set; }           // Customer
        public long ProfessionalId { get; set; }   // Professional
        public long ServiceId { get; set; }
        public DateTime ScheduledStart { get; set; }
        public DateTime ScheduledEnd { get; set; }
        public String Status { get; set; }  // enum
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
