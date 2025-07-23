using backend.DTO;
using backend.Models;

namespace backend.Services
{
    public interface IProfessionalService
    {
        Task<IEnumerable<ProfessionalDetails>> GetAllAsync();
        Task<ProfessionalDetails?> GetByIdAsync(long id);
        Task CreateAsync(ProfessionalDetails detail);
        Task UpdateAsync(ProfessionalDetails detail);

        //admin
        Task<IEnumerable<ProfessionalWithServicesDto>> GetAll();
        Task<bool> Create(CreateProfessionalDto dto);
        Task<IEnumerable<ProfessionalWithServicesDto>> GetByServiceId(long serviceId);
        Task<IEnumerable<TopBookedProfessionalDto>> GetTopBookedProfessionalsAsync();
    }
}
