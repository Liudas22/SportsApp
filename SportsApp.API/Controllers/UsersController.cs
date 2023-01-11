using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SportsApp.Core.Services.UserService;
using SportsApp.Domain.Models;
using SportsApp.Domain.Models.DTO;
using SportsApp.Infrastructure.Data;
using SportsApp.Infrastructure.Repositories;

namespace SportsApp.Controllers
{
    [ApiController]
    [Route("api")]
    public class UsersController : Controller
    {
        private readonly UserService userService;
        private MapperConfiguration config;
        private Mapper _mapper;
        public UsersController(DatabaseContext dbContext)
        {
            userService = new UserService(dbContext);
            config = new MapperConfiguration(cfg =>
                cfg.CreateMap<User, UserDTO>()
            );
            _mapper = new Mapper(config);
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(UserDTO userDto)
        {
            if (await userService.GetUserByName(userDto.Name) != null)
            {
                return Conflict();
            }
            if (await userService.GetUserByEmail(userDto.Email) != null)
            {
                return Unauthorized();
            }
            var addedUser = await userService.Post(userDto);

            return Ok(addedUser);
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserDTO userDto)
        {
            if (await userService.GetUserByEmail(userDto.Email) == null)
            {
                return NotFound();
            }
            var loginUser = await userService.Login(userDto);

            if (loginUser == null) return Unauthorized();

            loginUser.IsLoggedIn = true;

            return Ok(loginUser);
        }
    }
}
