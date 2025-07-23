using backend.Models;
using System.Data;
using Dapper;

namespace backend.Repositories
{
    public class ProfessionalAvailabilityRepository : IProfessionalAvailabilityRepository
    {
        private readonly IDbConnection _db;
        public ProfessionalAvailabilityRepository(IDbConnection db) => _db = db;

        public async Task<IEnumerable<ProfessionalAvailability>> GetByProfessionalIdAsync(long professionalId)
        {
            var sql = "SELECT * FROM professional_availability WHERE professional_id = @ProfessionalId";
            return await _db.QueryAsync<ProfessionalAvailability>(sql, new { ProfessionalId = professionalId });
        }

        public async Task AddAsync(ProfessionalAvailability slot)
        {
            var sql = @"INSERT INTO professional_availability 
                   (professional_id, start_time, end_time, is_booked) 
                   VALUES (@ProfessionalId, @StartTime, @EndTime, @IsBooked)";
            await _db.ExecuteAsync(sql, slot);
        }

        public async Task UpdateAsync(long id, ProfessionalAvailability slot)
        {
            var sql = @"UPDATE professional_availability 
                    SET start_time = @StartTime, end_time = @EndTime, is_booked = @IsBooked 
                    WHERE availability_id = @AvailabilityId";
            slot.AvailabilityId = id;
            await _db.ExecuteAsync(sql, slot);
        }

        public async Task DeleteAsync(long id)
        {
            var sql = "DELETE FROM professional_availability WHERE availability_id = @Id";
            await _db.ExecuteAsync(sql, new { Id = id });
        }
    }

}
