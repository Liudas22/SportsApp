using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SportsApp.Core.Commands;
using SportsApp.Core.Interfaces;
using SportsApp.Core.Services;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Exceptions;
using SportsApp.Infrastructure.Repositories;

namespace SportsApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class LevelsController : Controller
    {
        private readonly ILevelRepository _levelRepository;
        private readonly ILevelService _levelService;
        private readonly IMapper _mapper;
        public LevelsController(ILevelRepository levelRepository,
                                ILevelService levelService,
                                IMapper mapper)
        {
            _levelRepository = levelRepository;
            _levelService = levelService;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<ActionResult> AddLevel(LevelCommand command)
        {
            var level = await _levelService.AddLevelAsync(command);
            if (level == null)
            {
                throw new ConflictException("Toks lygis jau egzistuoja");
            }
            return Ok(level);
        }
        [HttpPut]
        public async Task<ActionResult> UpdateLevel(LevelCommand command)
        {
            var level = await _levelService.UpdateLevelAsync(command);

            return Ok(level);
        }
        [HttpDelete]
        public async Task<ActionResult> RemoveLevel(int LevelID)
        {
            var level = await _levelService.DeleteLevelAsync(LevelID);
            return Ok(level);
        }
    }
}
