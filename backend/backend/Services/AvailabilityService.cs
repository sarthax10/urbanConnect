using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class AvailabilityService : IAvailabilityService
    {
        private readonly IAvailabilityRepository _availabilityRepo;

        public AvailabilityService(IAvailabilityRepository availabilityRepo)
        {
            _availabilityRepo = availabilityRepo;
        }

        public Task<ProfessionalAvailability?> GetByIdAsync(long availabilityId) =>
            _availabilityRepo.GetAvailabilityByIdAsync(availabilityId);

        public Task<IEnumerable<ProfessionalAvailability>> GetByProfessionalIdAsync(long professionalId) =>
            _availabilityRepo.GetAvailabilityByProfessionalIdAsync(professionalId);

        public Task<IEnumerable<ProfessionalAvailability>> GetAvailableSlotsByDateAsync(long professionalId, DateOnly date) =>
            _availabilityRepo.GetAvailableSlotsByDateAsync(professionalId, date);

        public Task AddAvailabilityAsync(ProfessionalAvailability availability) =>
            _availabilityRepo.AddAvailabilityAsync(availability);

        public Task DeleteAvailabilityAsync(long availabilityId) =>
            _availabilityRepo.DeleteAvailabilityAsync(availabilityId);

        public Task UpdateAvailabilityAsync(ProfessionalAvailability availability) =>
            _availabilityRepo.UpdateAvailabilityAsync(availability);
    }
}
