using backend.Models;

namespace backend.Repositories
{
    public interface IProfessionalReviewRepository
    {
        Task<long> AddReviewAsync(ProfessionalReview review);
        Task<IEnumerable<ProfessionalReview>> GetReviewsByProfessionalIdAsync(long professionalId);
        Task<double> GetAverageRatingByProfessionalIdAsync(long professionalId);
        Task<ProfessionalReview?> GetReviewByBookingIdAsync(long bookingId);
    }

}
