using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class ProfessionalAvailabilityService : IProfessionalAvailabilityService
    {
        private readonly IProfessionalAvailabilityRepository _repo;
        public ProfessionalAvailabilityService(IProfessionalAvailabilityRepository repo) => _repo = repo;

        public Task<IEnumerable<ProfessionalAvailability>> GetByProfessionalIdAsync(long professionalId) =>
            _repo.GetByProfessionalIdAsync(professionalId);

        public Task AddAsync(ProfessionalAvailability slot) => _repo.AddAsync(slot);

        public Task UpdateAsync(long id, ProfessionalAvailability slot) => _repo.UpdateAsync(id, slot);

        public Task DeleteAsync(long id) => _repo.DeleteAsync(id);
    }

}
