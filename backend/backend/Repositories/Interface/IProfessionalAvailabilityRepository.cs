using backend.Models;

namespace backend.Repositories
{
    public interface IProfessionalAvailabilityRepository
    {
        Task<IEnumerable<ProfessionalAvailability>> GetByProfessionalIdAsync(long professionalId);
        Task AddAsync(ProfessionalAvailability slot);
        Task UpdateAsync(long id, ProfessionalAvailability slot);
        Task DeleteAsync(long id);
    }

}
