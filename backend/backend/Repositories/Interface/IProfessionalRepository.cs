using backend.DTO;
using backend.Models;

namespace backend.Repositories
{
    public interface IProfessionalRepository
    {
        Task<IEnumerable<ProfessionalDetails>> GetAllAsync();
        Task<ProfessionalDetails?> GetByIdAsync(long professionalId);
        Task CreateAsync(ProfessionalDetails detail);
        Task UpdateAsync(ProfessionalDetails detail);

        //admin
        Task<IEnumerable<ProfessionalWithServicesDto>> GetAllProfessionalsWithServices();
        Task<bool> CreateProfessionalWithServices(CreateProfessionalDto dto);
        Task<IEnumerable<ProfessionalWithServicesDto>> GetProfessionalsByServiceId(long serviceId);
        Task UpdateProfessionalRatingAsync(long professionalId, double avgRating);
        Task<IEnumerable<TopBookedProfessionalDto>> GetTopBookedProfessionalsAsync();

    }
}
