using SportsApp.Core.Commands;
using SportsApp.Domain.Entities;

namespace SportsApp.Core.Interfaces
{
    public record HashPasswordResponse(byte[] PasswordHash, byte[] PasswordSalt);
    public interface IAuthService
    {
        HashPasswordResponse HashPassword(string password);
        Task<User?> LoginAsync(LoginCommand login);
        Task<User> RegisterAsync(RegisterCommand register);
    }
}
