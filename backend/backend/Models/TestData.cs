namespace backend.Models
{
    public class TestData
    {
        public List<User> Users { get; set; } = new();
        public List<Service> Services { get; set; } = new();
        public List<ProfessionalDetails> ProfessionalDetails { get; set; } = new();
        public List<ProfessionalAvailability> ProfessionalAvailability { get; set; } = new();
        public List<Booking> Bookings { get; set; } = new();
        public List<ProfessionalReview> ProfessionalReviews { get; set; } = new();
        public List<ProfessionalService> ProfessionalServices { get; set; } = new();
    }

}
