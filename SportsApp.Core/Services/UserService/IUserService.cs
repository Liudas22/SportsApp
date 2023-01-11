﻿using Microsoft.AspNetCore.Mvc;
using SportsApp.Domain.Models;
using SportsApp.Domain.Models.DTO;

namespace SportsApp.Core.Services.UserService
{
    public interface IUserService
    {
        Task<UserDTO> Post(UserDTO userDto);
        Task<IActionResult> ChangePassword(string email, string password);
        Task<UserDTO> Login(UserDTO userDto);
    }
}
