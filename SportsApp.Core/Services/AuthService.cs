using SportsApp.Core.Commands;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IHashService _hashService;

        public AuthService(IUserRepository userRepository, IHashService hashService)
        {
            _userRepository = userRepository;
            _hashService = hashService;
        }
        public async Task<User?> RegisterAsync(RegisterCommand register)
        {
            if (await _userRepository.GetByNameOrDefaultAsync(register.Name) != null)
            {
                throw new ValidationException("Toks naudotojo vardas jau egzistuoja");
            }
            if (await _userRepository.GetByEmailOrDefaultAsync(register.Email) != null)
            {
                throw new ConflictException("Toks el. paštas jau egzistuoja");
            }

            var (passwordHash, passwordSalt) = _hashService.HashPassword(register.Password);

            var newUser = new User()
            {
                Id = Guid.NewGuid(),
                Name = register.Name,
                Email = register.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = register.Role,
                Level = 0
            };

            await _userRepository.RegisterAsync(newUser);

            return newUser;
        }
        public async Task<User?> LoginAsync(LoginCommand login)
        {
            var user = await _userRepository.GetByEmailOrDefaultAsync(login.Email);

            if (user == null)
            {
                throw new NotFoundException("Naudotojas su tokiu el. pašto adresu neegzistuoja");
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            if (!computedHash.SequenceEqual(user.PasswordHash))
            {
                throw new ValidationException("Neteisingas slaptažodis");
            }

            return user;
        }
    }
}
