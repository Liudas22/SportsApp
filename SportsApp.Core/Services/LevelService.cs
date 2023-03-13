using SportsApp.Core.Commands;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Exceptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Services
{
    public class LevelService : ILevelService
    {
        private readonly ILevelRepository _levelRepository;
        public LevelService(ILevelRepository levelRepository)
        {
            _levelRepository = levelRepository;
        }
        public async Task<Level> AddLevelAsync(LevelCommand command)
        {
            var lvl = await _levelRepository.GetLevelByParameters(command);
            if(lvl != null)
            {
                throw new ConflictException("Toks lygis jau buvo sukurtas");
            }
            var level = new Level()
            {
                Id = Guid.NewGuid(),
                LevelID = await _levelRepository.GetLastLevel() + 1,
                Pullups = command.Pullups,
                Pushups = command.Pushups,
                Squats = command.Squats,
                Dips = command.Dips,
            };
            await _levelRepository.AddLevel(level);
            return level;
        }
        public async Task<Level> DeleteLevelAsync(int levelID)
        {
            var level = await _levelRepository.GetLevelByLevelNumber(levelID);
            if (level == null)
            {
                throw new NotFoundException("Lygis nerastas");
            }
            return await _levelRepository.RemoveLevel(level);
        }
        public async Task<Level> UpdateLevelAsync(LevelCommand command)
        {
            var level = await _levelRepository.GetLevelByLevelNumber(command.LevelID);
            if(level == null)
            {
                throw new NotFoundException("Lygis nerastas");
            }
            level.Pullups = command.Pullups;
            level.Pushups = command.Pushups;
            level.Dips = command.Dips;
            level.Squats = command.Squats;
            return await _levelRepository.UpdateLevel(level);
        }
    }
}
