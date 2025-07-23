using backend.Models;

namespace backend.Services
{
    public interface IProfessionalAvailabilityService
    {
        Task<IEnumerable<ProfessionalAvailability>> GetByProfessionalIdAsync(long professionalId);
        Task AddAsync(ProfessionalAvailability slot);
        Task UpdateAsync(long id, ProfessionalAvailability slot);
        Task DeleteAsync(long id);
    }

}
