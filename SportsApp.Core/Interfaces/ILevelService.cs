using SportsApp.Core.Commands;
using SportsApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Interfaces
{
    public interface ILevelService
    {
        Task<Level> AddLevelAsync(LevelCommand command);
        Task<Level> UpdateLevelAsync(LevelCommand command);
        Task<Level> DeleteLevelAsync(int levelID);
    }
}
