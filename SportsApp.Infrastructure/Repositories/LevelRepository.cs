using Microsoft.EntityFrameworkCore;
using SportsApp.Core.Commands;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Entities;
using SportsApp.Domain.Exceptions;
using SportsApp.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Infrastructure.Repositories
{
    public class LevelRepository : ILevelRepository
    {
        private readonly DatabaseContext _dbContext;
        public LevelRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Level> GetLevelByParameters(LevelCommand command)
        {
            var foundLevel = await _dbContext.Levels.FirstOrDefaultAsync(u => u.Pullups == command.Pullups && u.Pushups == command.Pushups && u.Dips == command.Dips && u.Squats == command.Squats);

            return foundLevel;
        }
        public async Task<Level> GetLevelByLevelNumber(int levelID)
        {
            var foundLevel = await _dbContext.Levels.FirstOrDefaultAsync(u => u.LevelID == levelID);

            return foundLevel;
        }
        public async Task<Level> AddLevel(Level newLevel)
        {
            _dbContext.Levels.Add(newLevel);
            await _dbContext.SaveChangesAsync();
            return newLevel;
        }
        public async Task<Level> RemoveLevel(Level level)
        {
            _dbContext.Levels.Remove(level);
            await _dbContext.SaveChangesAsync();
            return level;
        }
        public async Task<Level> UpdateLevel(Level levelToChange)
        {
            _dbContext.Levels.Update(levelToChange);
            await _dbContext.SaveChangesAsync();
            return levelToChange;
        }
        public async Task<int> GetLastLevel()
        {
            var levels = await _dbContext.Levels.ToListAsync();
            if (levels.Count() == 0)
                return 0;
            return levels[levels.Count() - 1].LevelID;
        }
    }
}
