using SportsApp.Core.Commands;
using SportsApp.Domain.Entities;

namespace SportsApp.Core.Interfaces
{
    public interface IAuthService
    {
        Task<User?> LoginAsync(LoginCommand login);
        Task<User?> RegisterAsync(RegisterCommand register);
    }
}
