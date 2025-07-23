using backend.Models;

namespace backend.Repositories
{
    public interface IAvailabilityRepository
    {
        Task<ProfessionalAvailability?> GetAvailabilityByIdAsync(long availabilityId);
        Task<IEnumerable<ProfessionalAvailability>> GetAvailabilityByProfessionalIdAsync(long professionalId);
        Task<IEnumerable<ProfessionalAvailability>> GetAvailableSlotsByDateAsync(long professionalId, DateOnly date);
        Task AddAvailabilityAsync(ProfessionalAvailability availability);
        Task DeleteAvailabilityAsync(long availabilityId);
        Task UpdateAvailabilityAsync(ProfessionalAvailability availability);
    }
}
