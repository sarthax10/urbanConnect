namespace backend.Models
{
    public class ProfessionalDetails
    {
        public long ProfessionalId { get; set; } // FK to User
        public decimal Rating { get; set; }
        public string? ProfileBio { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
