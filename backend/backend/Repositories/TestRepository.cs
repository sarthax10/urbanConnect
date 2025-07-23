using backend.Models;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class TestRepository : ITestRepository
    {
        private readonly IDbConnection _db;

        public TestRepository(IDbConnection db)
        {
            _db = db;
        }

        public async Task<TestData> GetAllDataAsync()
        {
            var data = new TestData
            {
                Users = (await _db.QueryAsync<User>("SELECT * FROM users")).ToList(),
                Services = (await _db.QueryAsync<Service>("SELECT * FROM services")).ToList(),
                ProfessionalDetails = (await _db.QueryAsync<ProfessionalDetails>("SELECT * FROM professional_details")).ToList(),
                ProfessionalAvailability = (await _db.QueryAsync<ProfessionalAvailability>("SELECT * FROM professional_availability")).ToList(),
                Bookings = (await _db.QueryAsync<Booking>("SELECT * FROM bookings")).ToList(),
                ProfessionalReviews = (await _db.QueryAsync<ProfessionalReview>("SELECT * FROM professional_reviews")).ToList(),
                ProfessionalServices = (await _db.QueryAsync<ProfessionalService>("SELECT * FROM professional_services")).ToList()
            };

            return data;
        }
    }

}
