using backend.Models;

namespace backend.Services
{
    public interface IProfessionalReviewService
    {
        Task AddReviewAsync(CreateProfessionalReviewDto dto, long userId);
        Task<ProfessionalReview?> GetReviewByBookingIdAsync(long bookingId);
    }

}
