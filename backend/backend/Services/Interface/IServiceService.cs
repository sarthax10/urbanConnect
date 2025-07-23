using backend.Models;

namespace backend.Services
{
    public interface IServiceService
    {
        Task<IEnumerable<Service>> GetAllAsync();
        Task<Service?> GetByIdAsync(long id);
        Task<IEnumerable<Service>> GetByCategoryAsync(string category);
        Task CreateAsync(Service service);
        Task UpdateAsync(long id, Service service);
        Task<IEnumerable<string>> GetAllCategoriesAsync();
    }
}
