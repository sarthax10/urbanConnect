using backend.DTO;
using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class ProfessionalService : IProfessionalService
    {
        private readonly IProfessionalRepository _repo;

        public ProfessionalService(IProfessionalRepository repo) => _repo = repo;

        public Task<IEnumerable<ProfessionalDetails>> GetAllAsync() => _repo.GetAllAsync();

        public Task<ProfessionalDetails?> GetByIdAsync(long id) => _repo.GetByIdAsync(id);

        public Task CreateAsync(ProfessionalDetails detail) => _repo.CreateAsync(detail);

        public Task UpdateAsync(ProfessionalDetails detail) => _repo.UpdateAsync(detail);

        //admin

        public Task<IEnumerable<ProfessionalWithServicesDto>> GetAll() => _repo.GetAllProfessionalsWithServices();

        public Task<bool> Create(CreateProfessionalDto dto) => _repo.CreateProfessionalWithServices(dto);

        public Task<IEnumerable<ProfessionalWithServicesDto>> GetByServiceId(long serviceId) =>
    _repo.GetProfessionalsByServiceId(serviceId);

        public async Task<IEnumerable<TopBookedProfessionalDto>> GetTopBookedProfessionalsAsync()
        {
            return await _repo.GetTopBookedProfessionalsAsync();
        }
    }
}
