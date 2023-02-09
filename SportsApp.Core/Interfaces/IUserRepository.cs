using SportsApp.Domain.Entities;

namespace SportsApp.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByIdAsync(Guid id);
        Task<User?> GetByEmailOrDefaultAsync(string email);
        Task<User?> GetByNameOrDefaultAsync(string name);
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> RegisterAsync(User user);
        Task<User> DeleteAsync(User user);
        Task<User> UpdateLevelAsync(User userToChange);
    }
}
