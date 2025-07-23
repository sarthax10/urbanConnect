namespace backend.Models
{
    public class ProfessionalService
    {
        public long ProfessionalId { get; set; } // FK to User
        public long ServiceId { get; set; }      // FK to Service
    }
}
