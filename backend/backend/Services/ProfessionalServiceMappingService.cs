using backend.Models;
using backend.Repositories;


namespace backend.Services
{
    public class ProfessionalServiceMappingService : IProfessionalServiceMappingService
    {
        private readonly IProfessionalServiceMappingRepository _repo;

        public ProfessionalServiceMappingService(IProfessionalServiceMappingRepository repo) => _repo = repo;

        public Task AssignServiceAsync(long professionalId, long serviceId) =>
            _repo.AssignServiceAsync(professionalId, serviceId);

        public Task<IEnumerable<Service>> GetServicesByProfessionalIdAsync(long professionalId) =>
            _repo.GetServicesByProfessionalIdAsync(professionalId);

        public Task UnassignServiceAsync(long professionalId, long serviceId) =>
            _repo.UnassignServiceAsync(professionalId, serviceId);
    }
}
