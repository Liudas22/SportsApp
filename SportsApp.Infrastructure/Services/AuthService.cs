using SportsApp.Core.Commands;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Entities;
using System.Security.Cryptography;
using SportsApp.Domain.Enums;
using System.Text;

namespace SportsApp.Infrastructure.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private static readonly Encoding HashEncoding = Encoding.UTF8;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public HashPasswordResponse HashPassword(string password)
        {
            using var hmac = new HMACSHA512();

            var response = new HashPasswordResponse(
                PasswordSalt: hmac.Key,
                PasswordHash: hmac.ComputeHash(HashEncoding.GetBytes(password))
            );

            return response;
        }
        public async Task<User?> RegisterAsync(RegisterCommand register)
        {
            if (await _userRepository.GetByNameOrDefaultAsync(register.Name) != null)
            {
                throw new Exception("Toks naudotojo vardas neegzistuoja");
            }
            if (await _userRepository.GetByEmailOrDefaultAsync(register.Email) != null)
            {
                return null;
            }

            var (passwordHash, passwordSalt) = HashPassword(register.Password);

            var newUser = new User()
            {
                Id = Guid.NewGuid(),
                Name = register.Name,
                Email = register.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Role = register.Role
            };

            await _userRepository.RegisterAsync(newUser);

            return newUser;
        }
        public async Task<User?> LoginAsync(LoginCommand login)
        {
            var user = await _userRepository.GetByEmailOrDefaultAsync(login.Email);

            if (user == null)
            {
                return null;
            }

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(HashEncoding.GetBytes(login.Password));

            if (!computedHash.SequenceEqual(user.PasswordHash))
            {
                throw new Exception("Incorrect user password");
            }

            return user;
        }
    }
}
