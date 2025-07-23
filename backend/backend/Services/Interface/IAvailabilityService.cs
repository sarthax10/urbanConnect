using backend.Models;

namespace backend.Services
{
    public interface IAvailabilityService
    {
        Task<ProfessionalAvailability?> GetByIdAsync(long availabilityId);
        Task<IEnumerable<ProfessionalAvailability>> GetByProfessionalIdAsync(long professionalId);
        Task<IEnumerable<ProfessionalAvailability>> GetAvailableSlotsByDateAsync(long professionalId, DateOnly date);
        Task AddAvailabilityAsync(ProfessionalAvailability availability);
        Task DeleteAvailabilityAsync(long availabilityId);
        Task UpdateAvailabilityAsync(ProfessionalAvailability availability);
    }
}
