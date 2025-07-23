using backend.Models;
using backend.Repositories;

namespace backend.Services
{
    public class ProfessionalReviewService : IProfessionalReviewService
    {
        private readonly IProfessionalReviewRepository _reviewRepo;
        private readonly IBookingRepository _bookingRepo;
        private readonly IProfessionalRepository _professionalRepo;

        public ProfessionalReviewService(
            IProfessionalReviewRepository reviewRepo,
            IBookingRepository bookingRepo,
            IProfessionalRepository professionalRepo)
        {
            _reviewRepo = reviewRepo;
            _bookingRepo = bookingRepo;
            _professionalRepo = professionalRepo;
        }

        public async Task AddReviewAsync(CreateProfessionalReviewDto dto, long userId)
        {
            // Validate: Only allow reviews for user's own completed bookings (optional but recommended)
            var booking = await _bookingRepo.GetBookingByIdAsync(dto.BookingId);
            if (booking == null || booking.UserId != userId || booking.Status != BookingStatus.COMPLETED.ToString())
                throw new Exception("Cannot leave a review for this booking.");

            // Save review
            var review = new ProfessionalReview
            {
                BookingId = dto.BookingId,
                Rating = dto.Rating,
                Comment = dto.Comment
            };
            await _reviewRepo.AddReviewAsync(review);

            // Update professional's average rating
            var avgRating = await _reviewRepo.GetAverageRatingByProfessionalIdAsync(booking.ProfessionalId);
            await _professionalRepo.UpdateProfessionalRatingAsync(booking.ProfessionalId, avgRating);
        }
        public async Task<ProfessionalReview?> GetReviewByBookingIdAsync(long bookingId)
        {
            return await _reviewRepo.GetReviewByBookingIdAsync(bookingId);
        }

    }

}
