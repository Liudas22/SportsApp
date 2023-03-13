using SportsApp.Core.Commands;
using SportsApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Interfaces
{
    public interface ILevelRepository
    {
        Task<Level> AddLevel(Level newLevel);
        Task<Level> UpdateLevel(Level levelToChange);
        Task<Level> RemoveLevel(Level level);
        Task<Level> GetLevelByParameters(LevelCommand command);
        Task<int> GetLastLevel();
        Task<Level> GetLevelByLevelNumber(int levelID);
    }
}
