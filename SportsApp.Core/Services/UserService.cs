using Microsoft.Win32;
using SportsApp.Core.Commands;
using SportsApp.Core.DTO;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<User?> DeleteAsync(string email)
        {
            var user = await _userRepository.GetByEmailOrDefaultAsync(email);

            if (user == null)
            {
                throw new NotFoundException("Naudotojas nerastas");
            }
            await _userRepository.DeleteAsync(user);

            return user;
        }
        public async Task<User?> UpdateUserLevelAsync(string username)
        {
            var user = await _userRepository.GetByNameOrDefaultAsync(username);

            if (user == null)
            {
                throw new NotFoundException("Naudotojas nerastas");
            }
            user.Level++;
            await _userRepository.UpdateUserProfileAsync(user);

            return user;
        }

        public async Task<User> UpdateUserProfileAsync(UpdateFullProfileCommand command, Guid id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
            {
                throw new NotFoundException("Naudotojas nerastas");
            }
            user.Avatar = command.Avatar;
            user.Name   = command.Username;
            user.Email  = command.Email;
            await _userRepository.UpdateUserProfileAsync(user);

            return user;
        }
        public async Task<User> UpdateUserAvatarAsync(UpdateAvatarCommand command)
        {
            var user = await _userRepository.GetByNameOrDefaultAsync(command.Username);
            if (user == null)
            {
                throw new NotFoundException("Naudotojas nerastas");
            }
            user.Avatar = command.Avatar;
            await _userRepository.UpdateUserProfileAsync(user);

            return user;
        }
    }
}
