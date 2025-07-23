namespace backend.DTO
{
    public class ProfessionalWithServicesDto
    {
        public long ProfessionalId { get; set; }
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string ProfileBio { get; set; } = null!;
        public decimal Rating { get; set; }
        public List<ServiceDto> Services { get; set; } = new();
    }

    public class AvailableSlotDto
    {
        public long AvailabilityId { get; set; }
        public long ProfessionalId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }

    public class AvailableSlotRaw
    {
        public long AvailabilityId { get; set; }
        public long ProfessionalId { get; set; }
        public TimeOnly AvailableTime { get; set; }
    }

    public class CreateProfessionalDto
    {
        public string Name { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string ProfileBio { get; set; } = null!;
        public List<long> ServiceIds { get; set; } = new();
    }

    

    public class ServiceDto
    {
        public long ServiceId { get; set; }
        public string Name { get; set; } = null!;
        public string Category { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int DurationMinutes { get; set; }
    }

    public class TopBookedProfessionalDto
    {
        public long UserId { get; set; }
        public string ProfessionalName { get; set; }
        public decimal? Rating { get; set; }
        public string ProfileBio { get; set; }
        public string ServicesOffered { get; set; }
        public int TotalBookings { get; set; }
    }

}
