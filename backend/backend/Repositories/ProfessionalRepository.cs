// Repositories/ProfessionalRepository.cs
using backend.DTO;
using backend.Models;
using backend.Repositories;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class ProfessionalRepository : IProfessionalRepository
    {
        private readonly IDbConnection _db;

        public ProfessionalRepository(IDbConnection db) => _db = db;

        public async Task<IEnumerable<ProfessionalDetails>> GetAllAsync()
        {
            var sql = "SELECT * FROM professional_details";
            return await _db.QueryAsync<ProfessionalDetails>(sql);
        }

        public async Task<ProfessionalDetails?> GetByIdAsync(long professionalId)
        {
            var sql = "SELECT * FROM professional_details WHERE professional_id = @Id";
            return await _db.QueryFirstOrDefaultAsync<ProfessionalDetails>(sql, new { Id = professionalId });
        }

        public async Task CreateAsync(ProfessionalDetails detail)
        {
            var sql = @"INSERT INTO professional_details (professional_id, rating, profile_bio)
                        VALUES (@ProfessionalId, @Rating, @ProfileBio)";
            await _db.ExecuteAsync(sql, detail);
        }

        public async Task UpdateAsync(ProfessionalDetails detail)
        {
            var sql = @"UPDATE professional_details 
                        SET rating = @Rating, profile_bio = @ProfileBio 
                        WHERE professional_id = @ProfessionalId";
            await _db.ExecuteAsync(sql, detail);
        }

        //admin
        public async Task<IEnumerable<ProfessionalWithServicesDto>> GetAllProfessionalsWithServices()
        {
            var query = @"
        SELECT 
            u.user_id, u.name, u.email, 
            pd.profile_bio, pd.rating,
            s.service_id AS ServiceId, s.name AS ServiceName, 
            s.category AS Category, s.description AS Description, 
            s.duration_minutes AS DurationMinutes
        FROM users u
        JOIN professional_details pd ON u.user_id = pd.professional_id
        LEFT JOIN professional_services ps ON u.user_id = ps.professional_id
        LEFT JOIN services s ON ps.service_id = s.service_id
        ORDER BY u.user_id;
    ";

            var result = await _db.QueryAsync(query);

            var grouped = result.GroupBy(r => (long)r.user_id).Select(g => new ProfessionalWithServicesDto
            {
                ProfessionalId = g.Key,
                Name = g.First().name,
                Email = g.First().email,
                ProfileBio = g.First().profile_bio,
                Rating = g.First().rating,
                Services = g.Where(x => x.ServiceId != null).Select(x => new ServiceDto
                {
                    ServiceId = x.ServiceId,
                    Name = x.ServiceName,
                    Category = x.Category,
                    Description = x.Description,
                    DurationMinutes = x.DurationMinutes
                }).ToList()
            });

            return grouped;
        }


        public async Task<bool> CreateProfessionalWithServices(CreateProfessionalDto dto)
        {
            IDbTransaction? tx = null;

            try
            {
                if (_db.State != ConnectionState.Open)
                    _db.Open(); // Ensure connection is open

                tx = _db.BeginTransaction();

                // Create user
                var userId = await _db.ExecuteScalarAsync<long>(
                    "INSERT INTO users (name, email, role) VALUES (@Name, @Email, 'professional'); SELECT LAST_INSERT_ID();",
                    new { dto.Name, dto.Email }, tx);

                // Create professional_details
                await _db.ExecuteAsync(
                    "INSERT INTO professional_details (professional_id, profile_bio) VALUES (@UserId, @Bio);",
                    new { UserId = userId, Bio = dto.ProfileBio }, tx);

                // Assign services
                foreach (var serviceId in dto.ServiceIds)
                {
                    await _db.ExecuteAsync(
                        "INSERT INTO professional_services (professional_id, service_id) VALUES (@UserId, @ServiceId);",
                        new { UserId = userId, ServiceId = serviceId }, tx);
                }

                tx.Commit();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in CreateProfessionalWithServices: {ex.Message}");
                if (tx != null)
                {
                    try { tx.Rollback(); } catch (Exception rollbackEx) { Console.WriteLine($"Rollback failed: {rollbackEx.Message}"); }
                }
                return false; // Don't throw here unless you're debugging at a higher level
            }
        }

        public async Task<IEnumerable<ProfessionalWithServicesDto>> GetProfessionalsByServiceId(long serviceId)
        {
            var query = @"
        SELECT u.user_id, u.name, u.email, pd.profile_bio, pd.rating,
               s.name AS service_name, s.category, s.duration_minutes
        FROM users u
        JOIN professional_details pd ON u.user_id = pd.professional_id
        JOIN professional_services ps ON u.user_id = ps.professional_id
        JOIN services s ON ps.service_id = s.service_id
        WHERE s.service_id = @ServiceId
        ORDER BY u.user_id;
    ";

            var result = await _db.QueryAsync<dynamic>(query, new { ServiceId = serviceId });

            var grouped = result.GroupBy(r => r.user_id).Select(g => new ProfessionalWithServicesDto
            {
                ProfessionalId = g.Key,
                Name = g.First().name,
                Email = g.First().email,
                ProfileBio = g.First().profile_bio,
                Rating = g.First().rating,
                Services = g.Select(x => new ServiceDto
                {
                    Name = x.service_name,
                    Category = x.category,
                    DurationMinutes = x.duration_minutes
                }).ToList()
            });

            return grouped;
        }
        public async Task UpdateProfessionalRatingAsync(long professionalId, double avgRating)
        {
            var sql = "UPDATE professional_details SET rating = @AvgRating WHERE professional_id = @ProfessionalId";
            await _db.ExecuteAsync(sql, new { ProfessionalId = professionalId, AvgRating = avgRating });
        }

        public async Task<IEnumerable<TopBookedProfessionalDto>> GetTopBookedProfessionalsAsync()
        {
            // Stored Procedure call: No parameters needed
            var professionals = await _db.QueryAsync<TopBookedProfessionalDto>(
                "SP_GetTopBookedProfessionals",
                commandType: CommandType.StoredProcedure
            );
            return professionals;
        }



    }
}
