using backend.Models;
using Dapper;
using System.Data;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection _db;

        public UserRepository(IDbConnection db) => _db = db;

        public async Task<User?> GetUserByEmailAsync(string email)
        {
            var sql = "SELECT * FROM users WHERE email = @Email";
            return await _db.QueryFirstOrDefaultAsync<User>(sql, new { Email = email });
        }

        public async Task<User?> GetUserByIdAsync(long userId)
        {
            string sql = "SELECT * FROM users WHERE user_id = @UserId";
            return await _db.QueryFirstOrDefaultAsync<User>(sql, new { UserId = userId });
        }

        public async Task CreateUserAsync(User user)
        {
            var sql = @"INSERT INTO users (name, email, role, created_at)
            VALUES (@Name, @Email, @Role, @CreatedAt)";
            await _db.ExecuteAsync(sql, user);
        }

    }

}
