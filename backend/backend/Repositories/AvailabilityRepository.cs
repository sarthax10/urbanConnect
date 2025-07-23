using backend.Models;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class AvailabilityRepository : IAvailabilityRepository
    {
        private readonly IDbConnection _db;

        public AvailabilityRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<ProfessionalAvailability?> GetAvailabilityByIdAsync(long availabilityId)
        {
            var sql = "SELECT * FROM professional_availability WHERE availability_id = @Id";
            return await _db.QueryFirstOrDefaultAsync<ProfessionalAvailability>(sql, new { Id = availabilityId });
        }

        public async Task<IEnumerable<ProfessionalAvailability>> GetAvailabilityByProfessionalIdAsync(long professionalId)
        {
            var sql = "SELECT * FROM professional_availability WHERE professional_id = @ProfessionalId";
            return await _db.QueryAsync<ProfessionalAvailability>(sql, new { ProfessionalId = professionalId });
        }

        public async Task<IEnumerable<ProfessionalAvailability>> GetAvailableSlotsByDateAsync(long professionalId, DateOnly date)
        {
            var sql = @"
                SELECT * FROM professional_availability
                WHERE professional_id = @ProfessionalId
                    AND is_booked = FALSE
                    AND DATE(start_time) = @Date";

            return await _db.QueryAsync<ProfessionalAvailability>(
                sql,
                new
                {
                    ProfessionalId = professionalId,
                    Date = date.ToString("yyyy-MM-dd")
                });
        }

        public async Task AddAvailabilityAsync(ProfessionalAvailability availability)
        {
            var sql = @"
                INSERT INTO professional_availability 
                    (professional_id, start_time, end_time, is_booked)
                VALUES
                    (@ProfessionalId, @StartTime, @EndTime, @IsBooked)";
            await _db.ExecuteAsync(sql, availability);
        }

        public async Task DeleteAvailabilityAsync(long availabilityId)
        {
            var sql = "DELETE FROM professional_availability WHERE availability_id = @Id";
            await _db.ExecuteAsync(sql, new { Id = availabilityId });
        }

        public async Task UpdateAvailabilityAsync(ProfessionalAvailability availability)
        {
            var sql = @"
                UPDATE professional_availability
                SET 
                    start_time = @StartTime,
                    end_time = @EndTime,
                    is_booked = @IsBooked
                WHERE availability_id = @AvailabilityId";
            await _db.ExecuteAsync(sql, availability);
        }
    }
}
