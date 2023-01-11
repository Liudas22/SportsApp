using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SportsApp.Domain.Models;
using SportsApp.Domain.Models.DTO;
using SportsApp.Infrastructure.Repositories;
using SportsApp.Infrastructure.Data;
using Microsoft.Identity.Client;

namespace SportsApp.Core.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly UserRepository _userRepository;
        public UserService(DatabaseContext dbContext)
        {
            _userRepository = new UserRepository(dbContext);
        }
        public async Task<User> Post(UserDTO userDto)
        {
            User user = new User()
            {
                Id = Guid.NewGuid(),
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password,
                IsLoggedIn = false,
                Role = userDto.Role
            };

            var addedUser = await _userRepository.AddUser(user);

            return addedUser;
        }
        public Task<IActionResult> ChangePassword(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<UserDTO> Login(UserDTO userDto)
        {
            User existingUser = await GetUserByEmail(userDto.Email);

            if (userDto.Password != existingUser.Password)
            {
                return null;
            }
            else
            {
                return userDto;
            }
        }
        public async Task<User> GetUserByEmail(string email)
        {
            return await _userRepository.GetUserByEmail(email);
        }
        public async Task<User> GetUserByName(string name)
        {
            return await _userRepository.GetUserByName(name);
        }
    }
}
