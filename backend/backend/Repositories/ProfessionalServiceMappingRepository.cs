using backend.Models;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class ProfessionalServiceMappingRepository : IProfessionalServiceMappingRepository
    {
        private readonly IDbConnection _db;

        public ProfessionalServiceMappingRepository(IDbConnection db) => _db = db;

        public async Task AssignServiceAsync(long professionalId, long serviceId)
        {
            var sql = "INSERT INTO professional_services (professional_id, service_id) VALUES (@ProfessionalId, @ServiceId)";
            await _db.ExecuteAsync(sql, new { ProfessionalId = professionalId, ServiceId = serviceId });
        }
        public async Task UnassignServiceAsync(long professionalId, long serviceId)
        {
            var sql = "DELETE FROM professional_services WHERE professional_id = @ProfessionalId AND service_id = @ServiceId";
            await _db.ExecuteAsync(sql, new { ProfessionalId = professionalId, ServiceId = serviceId });
        }
        public async Task<IEnumerable<Service>> GetServicesByProfessionalIdAsync(long professionalId)
        {
            var sql = @"SELECT s.* 
                FROM services s 
                JOIN professional_services ps ON s.service_id = ps.service_id 
                WHERE ps.professional_id = @ProfessionalId";
            return await _db.QueryAsync<Service>(sql, new { ProfessionalId = professionalId });
        }

    }
}
