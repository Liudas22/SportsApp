using Microsoft.Win32;
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

            return null;
        }
    }
}
