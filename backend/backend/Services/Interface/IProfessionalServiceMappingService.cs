using backend.Models;

namespace backend.Services
{
    public interface IProfessionalServiceMappingService
    {
        Task AssignServiceAsync(long professionalId, long serviceId);
        Task<IEnumerable<Service>> GetServicesByProfessionalIdAsync(long professionalId);
        Task UnassignServiceAsync(long professionalId, long serviceId);

    }
}
