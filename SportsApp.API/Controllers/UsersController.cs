using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportsApp.Core.Commands;
using SportsApp.Core.DTO;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Models.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using SportsApp.Domain.Enums;
using SportsApp.API.Attributes;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Exceptions;

namespace SportsApp.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UsersController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IAuthService _authService;
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;
        private readonly IMapper _mapper;
        public UsersController(
            IUserRepository userRepository,
            IAuthService authService,
            IUserService userService,
            IJwtService jwtService,
            IMapper mapper)
        {
            _userRepository = userRepository;
            _authService = authService;
            _userService = userService;
            _jwtService = jwtService;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<ActionResult<JwtDto>> Login([FromBody] LoginCommand command)
        {
            var user = await _authService.LoginAsync(command);

            var jwt = _jwtService.BuildJwt(user);

            return Ok(jwt);
        }
        [HttpPost]
        public async Task<ActionResult> RegisterAsync([FromBody] RegisterCommand command)
        {
            var user = await _authService.RegisterAsync(command);

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
        [HttpDelete("{email}")]
        [AuthorizeRole(UserRole.Admin)]
        public async Task<ActionResult<IEnumerable<UserDto>>> DeleteUser(string email)
        {
            await _userService.DeleteAsync(email);

            return Ok();
        }
        [HttpPut("{uploadedBy}")]
        public async Task<ActionResult> UpdateUserLevel(string uploadedBy)
        {
            var user = await _userService.UpdateUserLevelAsync(uploadedBy);

            return Ok(user);
        }
        [HttpGet]
        public async Task<ActionResult> GetUserAvatar()
        {
            var user = _userRepository.GetByIdAsync(UserId);
            if (user == null) throw new NotFoundException("Naudotojas nerastas");

            var userDto = _mapper.Map<UserAvatarDto>(user);
            return Ok(userDto);
        }
        [HttpPut]
        public async Task<ActionResult> UpdateUserProfile(UpdateFullProfileCommand command)
        {
            var user = await _userService.UpdateUserProfileAsync(command, UserId);

            return Ok(user);
        }
        [HttpPut]
        public async Task<ActionResult> UpdateUserAvatar(UpdateAvatarCommand command)
        {
            var user = await _userService.UpdateUserAvatarAsync(command);

            return Ok(user);
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
