﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SportsApp.Core.Commands;
using SportsApp.Core.DTO;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Models;
using SportsApp.Domain.Models.DTO;
using SportsApp.Infrastructure.Data;
using SportsApp.Infrastructure.Repositories;
using SportsApp.Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using SportsApp.Domain.Entities;
using System.Security.Claims;
using SportsApp.Domain.Enums;
using SportsApp.API.Attributes;

namespace SportsApp.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UsersController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthService _authService;
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;
        public UsersController(
            IUserRepository userRepository,
            IAuthService authService,
            IJwtService jwtService,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _authService = authService;
            _jwtService = jwtService;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<ActionResult<JwtDto>> Login([FromBody] LoginCommand command)
        {
            var user = await _authService.LoginAsync(command);

            if (user == null)
                return NotFound("Toks naudotojas neegzistuoja");

            var jwt = _jwtService.BuildJwt(user);

            return Ok(jwt);
        }
        [HttpPost]
        public async Task<ActionResult> RegisterAsync([FromBody] RegisterCommand command)
        {
            var user = await _authService.RegisterAsync(command);

            if(user == null)
            {
                return Conflict("Toks vartotojas jau egzistuoja");
            }

            var userDto = _mapper.Map<UserDto>(user);

            return Ok(userDto);
        }
        [HttpGet]
        [Authorize(
            AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,
            Roles = "User,Admin,Coach")]
        public async Task<ActionResult<UserDto>> Me()
        {
            var user = await _userRepository.GetByIdAsync(UserId);

            var userDto = _mapper.Map<UserDto>(user);

            return Ok(userDto);
        }
        [HttpGet]
        [AuthorizeRole(UserRole.Admin)]
        public async Task<ActionResult<IEnumerable<UserDto>>> AllUsers()
        {
            var users = await _userRepository.GetAllAsync();

            var usersDto = users.Select(user => _mapper.Map<UserDto>(user));

            return Ok(usersDto);
        }
        private Guid UserId
        {
            get
            {
                try
                {
                    return Guid.Parse(User.FindFirstValue(ClaimTypes.Sid));
                }
                catch
                {
                    throw new InvalidOperationException(
                        $"Could not access user when there is no authorize attribute");
                }
            }
        }
    }
}
