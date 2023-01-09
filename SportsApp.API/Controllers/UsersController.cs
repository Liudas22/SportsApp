using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SportsApp.Core.Services.UserService;
using SportsApp.Domain.Models;
using SportsApp.Domain.Models.DTO;
using SportsApp.Infrastructure.Data;

namespace SportsApp.Controllers
{
    [ApiController]
    [Route("api")]
    public class UsersController : Controller
    {
        private readonly UserService userService; 
        public UsersController(DatabaseContext dbContext)
        {
            userService = new UserService(dbContext);
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(UserDTO userDto)
        {
            var addedUser = await userService.Post(userDto);

            if (addedUser == null) return Unauthorized();

            return Ok(addedUser);
        }
        /*[HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> ChangePassword(string email, string password)
        {
            _userRepository.UpdatePassword(email, password);

            return Ok();
        }*/
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(UserDTO userDto)
        {
            var addedUser = await userService.Login(userDto);

            if (addedUser == null) return Unauthorized();

            return Ok(addedUser);
        }
    }
}
