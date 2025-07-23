using backend.Models;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class ServiceRepository : IServiceRepository
    {
        private readonly IDbConnection _db;

        public ServiceRepository(IDbConnection db) => _db = db;

        public async Task<IEnumerable<Service>> GetAllServicesAsync()
        {
            return await _db.QueryAsync<Service>("SELECT * FROM services");
        }

        public async Task<Service?> GetServiceByIdAsync(long id)
        {
            return await _db.QueryFirstOrDefaultAsync<Service>("SELECT * FROM services WHERE service_id = @Id", new { Id = id });
        }

        public async Task<IEnumerable<Service>> GetServicesByCategoryAsync(string category)
        {
            return await _db.QueryAsync<Service>("SELECT * FROM services WHERE category = @Category", new { Category = category });
        }

        public async Task CreateServiceAsync(Service service)
        {
            string sql = @"INSERT INTO services (name, category, description, duration_minutes)
                           VALUES (@Name, @Category, @Description, @DurationMinutes)";
            await _db.ExecuteAsync(sql, service);
        }

        public async Task UpdateServiceAsync(long id, Service service)
        {
            string sql = @"UPDATE services
                           SET name = @Name, category = @Category, description = @Description, duration_minutes = @DurationMinutes
                           WHERE service_id = @Id";
            await _db.ExecuteAsync(sql, new { service.Name, service.Category, service.Description, service.DurationMinutes, Id = id });
        }
        public async Task<IEnumerable<string>> GetAllCategoriesAsync()
        {
            var sql = "SELECT DISTINCT category FROM services";
            return await _db.QueryAsync<string>(sql);
        }
        public async Task<int> GetServiceDurationInMinutesAsync(long serviceId)
        {
            var sql = "SELECT duration_minutes FROM services WHERE service_id = @ServiceId";

            var result = await _db.QueryFirstOrDefaultAsync<int?>(sql, new { ServiceId = serviceId });

            if (result == null)
                throw new Exception("Service not found or missing duration.");

            return result.Value;
        }
    }
}
