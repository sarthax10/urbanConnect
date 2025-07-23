using backend.Models;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class ProfessionalReviewRepository : IProfessionalReviewRepository
    {
        private readonly IDbConnection _db;

        public ProfessionalReviewRepository(IDbConnection db) => _db = db;

        public async Task<long> AddReviewAsync(ProfessionalReview review)
        {
            var sql = @"
            INSERT INTO professional_reviews (booking_id, rating, comment, created_at)
            VALUES (@BookingId, @Rating, @Comment, NOW());
            SELECT LAST_INSERT_ID();";
            return await _db.ExecuteScalarAsync<long>(sql, review);
        }

        public async Task<IEnumerable<ProfessionalReview>> GetReviewsByProfessionalIdAsync(long professionalId)
        {
            var sql = @"
            SELECT r.*
            FROM professional_reviews r
            JOIN bookings b ON r.booking_id = b.booking_id
            WHERE b.professional_id = @ProfessionalId";
            return await _db.QueryAsync<ProfessionalReview>(sql, new { ProfessionalId = professionalId });
        }

        public async Task<double> GetAverageRatingByProfessionalIdAsync(long professionalId)
        {
            var sql = @"
            SELECT AVG(r.rating)
            FROM professional_reviews r
            JOIN bookings b ON r.booking_id = b.booking_id
            WHERE b.professional_id = @ProfessionalId";
            var avg = await _db.ExecuteScalarAsync<double?>(sql, new { ProfessionalId = professionalId });
            return avg ?? 0.0;
        }

        public async Task<ProfessionalReview?> GetReviewByBookingIdAsync(long bookingId)
        {
            var sql = "SELECT * FROM professional_reviews WHERE booking_id = @BookingId LIMIT 1";
            return await _db.QueryFirstOrDefaultAsync<ProfessionalReview>(sql, new { BookingId = bookingId });
        }

    }

}
