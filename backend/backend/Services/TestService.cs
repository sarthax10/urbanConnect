using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class TestService
    {
        private readonly ITestRepository _repo;

        public TestService(ITestRepository repo)
        {
            _repo = repo;
        }

        public Task<TestData> GetAllAsync()
        {
            return _repo.GetAllDataAsync();
        }
    }

}
