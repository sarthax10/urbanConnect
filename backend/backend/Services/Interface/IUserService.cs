using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        Task<User> RegisterIfNotExistsAsync(User user);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> GetUserByIdAsync(long userId);
    }

}
