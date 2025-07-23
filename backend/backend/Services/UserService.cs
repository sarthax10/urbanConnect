using backend.Models;
using backend.Repositories;


namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepo;

        public UserService(IUserRepository userRepo) => _userRepo = userRepo;

        public Task<User?> GetUserByIdAsync(long userId)
        {
            return _userRepo.GetUserByIdAsync(userId);
        }

        public async Task<User> RegisterIfNotExistsAsync(User user)
        {
            var existingUser = await _userRepo.GetUserByEmailAsync(user.Email);
            if (existingUser is not null) return existingUser;

            await _userRepo.CreateUserAsync(user);
            return await _userRepo.GetUserByEmailAsync(user.Email); // Fetch after insert
        }

        public Task<User?> GetUserByEmailAsync(string email) =>
            _userRepo.GetUserByEmailAsync(email);
    }

}
