using backend.Models;

namespace backend.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetUserByEmailAsync(string email);
        Task CreateUserAsync(User user);
        Task<User?> GetUserByIdAsync(long userId);

    }

}
