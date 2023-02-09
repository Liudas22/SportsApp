using SportsApp.Core.Commands;
using SportsApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Interfaces
{
    public interface IUserService
    {
        Task<User?> DeleteAsync(string email);
        Task<User?> UpdateUserLevelAsync(string username);
    }
}
