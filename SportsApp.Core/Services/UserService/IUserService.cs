using Microsoft.AspNetCore.Mvc;
using SportsApp.Domain.Models;
using SportsApp.Domain.Models.DTO;

namespace SportsApp.Core.Services.UserService
{
    public interface IUserService
    {
        Task<User> Post(UserDTO userDto);
        Task<IActionResult> ChangePassword(string email, string password);
        Task<User> Login(UserDTO userDto);
    }
}
