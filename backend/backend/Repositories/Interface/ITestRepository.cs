using backend.Models;

namespace backend.Repositories
{
    public interface ITestRepository
    {
        Task<TestData> GetAllDataAsync();
    }
}
