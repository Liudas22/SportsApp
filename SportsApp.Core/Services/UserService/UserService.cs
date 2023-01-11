using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SportsApp.Domain.Models;
using SportsApp.Domain.Models.DTO;
using SportsApp.Infrastructure.Repositories;
using SportsApp.Infrastructure.Data;
using Microsoft.Identity.Client;
using AutoMapper;

namespace SportsApp.Core.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly UserRepository _userRepository;
        private MapperConfiguration config;
        private Mapper _mapper;
        public UserService(DatabaseContext dbContext)
        {
            _userRepository = new UserRepository(dbContext);
            config = new MapperConfiguration(cfg =>
                cfg.CreateMap<User, UserDTO>()
            );
            _mapper = new Mapper(config);
        }
        public async Task<UserDTO> Post(UserDTO userDto)
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

            UserDTO userDTO = _mapper.Map<User, UserDTO>(addedUser);
            return userDTO;
        }
        public Task<IActionResult> ChangePassword(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<UserDTO> Login(UserDTO user)
        {
            User existingUser = await GetUserByEmail(user.Email);

            if (user.Password != existingUser.Password)
            {
                return null;
            }
            else
            {
                UserDTO userDTO = _mapper.Map<User, UserDTO>(existingUser);
                return userDTO;
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
