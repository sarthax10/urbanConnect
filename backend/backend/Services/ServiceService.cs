using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class ServiceService : IServiceService
    {
        private readonly IServiceRepository _repo;

        public ServiceService(IServiceRepository repo) => _repo = repo;

        public Task<IEnumerable<Service>> GetAllAsync() => _repo.GetAllServicesAsync();
        public Task<Service?> GetByIdAsync(long id) => _repo.GetServiceByIdAsync(id);
        public Task<IEnumerable<Service>> GetByCategoryAsync(string category) => _repo.GetServicesByCategoryAsync(category);
        public Task CreateAsync(Service service) => _repo.CreateServiceAsync(service);
        public Task UpdateAsync(long id, Service service) => _repo.UpdateServiceAsync(id, service);
        public Task<IEnumerable<string>> GetAllCategoriesAsync() => _repo.GetAllCategoriesAsync();

    }
}
