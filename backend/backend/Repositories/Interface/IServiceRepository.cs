using backend.Models;

namespace backend.Repositories
{
    public interface IServiceRepository
    {
        Task<IEnumerable<Service>> GetAllServicesAsync();
        Task<Service?> GetServiceByIdAsync(long id);
        Task<IEnumerable<Service>> GetServicesByCategoryAsync(string category);
        Task CreateServiceAsync(Service service);
        Task UpdateServiceAsync(long id, Service service);
        Task<IEnumerable<string>> GetAllCategoriesAsync();
        Task<int> GetServiceDurationInMinutesAsync(long serviceId);
    }
}
