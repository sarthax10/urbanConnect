using backend.Models;

namespace backend.Repositories
{
    public interface IProfessionalServiceMappingRepository
    {
        Task AssignServiceAsync(long professionalId, long serviceId);
        Task UnassignServiceAsync(long professionalId, long serviceId);
        Task<IEnumerable<Service>> GetServicesByProfessionalIdAsync(long professionalId);

    }
}
