using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SportsApp.Domain.Models;
using SportsApp.Domain.Models.DTO;
using SportsApp.Infrastructure.Repositories;
using SportsApp.Infrastructure.Data;

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
            var existUser = await _userRepository.GetUserByEmail(userDto.Email);

            if (existUser != null)
            {
                return null;
            }

            User user = new User()
            {
                Id = Guid.NewGuid(),
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password
            };

            var addedUser = await _userRepository.AddUser(user);

            return addedUser;
        }
        public Task<IActionResult> ChangePassword(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Login(UserDTO userDto)
        {
            var existingUser = await _userRepository.GetUserByEmail(userDto.Email);

            /*if (existingUser == null)
            {
                //return NotFound();
                return null;
            }*/

            if (userDto.Password != existingUser.Password)
            {
                return null;
                //return Conflict();
            }

            return existingUser;
        }
    }
}
