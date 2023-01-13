using Microsoft.EntityFrameworkCore;
using SportsApp.Domain.Models;
using SportsApp.Domain.Models.DTO;
using SportsApp.Core.Interfaces;
using SportsApp.Infrastructure.Data;
using SportsApp.Domain.Entities;

namespace SportsApp.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DatabaseContext _dbContext;
        public UserRepository(DatabaseContext context)
        {
            _dbContext = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            var users = await _dbContext.Users.ToListAsync();

            return users;
        }

        public async Task<User?> GetByEmailOrDefaultAsync(string email)
        {
            var users = await _dbContext.Users.ToListAsync();
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            return user;
        }
        public async Task<User?> GetByNameOrDefaultAsync(string name)
        {
            var users = await _dbContext.Users.ToListAsync();
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Name == name);

            return user;
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            var user = await _dbContext.Users.FirstAsync(u => u.Id == id);

            return user;
        }
        public async Task<User> RegisterAsync(User newUser)
        {
            _dbContext.Users.Add(newUser);
            await _dbContext.SaveChangesAsync();
            return newUser;
        }
    }
}
