using Microsoft.EntityFrameworkCore;
using SportsApp.Domain.Models;
using SportsApp.Domain.Models.DTO;
using SportsApp.Infrastructure.Data;

namespace SportsApp.Infrastructure.Repositories
{
    public class UserRepository
    {
        private readonly DatabaseContext _dbContext;
        public UserRepository(DatabaseContext context)
        {
            _dbContext = context;
        }
        public async Task<List<User>> GetAll()
        {
            return await _dbContext.Users.ToListAsync();
        }
        public async Task<User> GetUserByEmail(string email)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Email == email);
        }
        public async Task<User> GetUserByName(string name)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Name == name);
        }
        public async Task<User> AddUser(User user)
        {
            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return user;
        }
        public async Task UpdatePassword(string email, string password)
        {
            User user = await GetUserByEmail(email);

            user.Password = password;

            await _dbContext.SaveChangesAsync();
        }
    }
}
