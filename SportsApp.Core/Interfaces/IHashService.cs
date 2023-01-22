using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportsApp.Core.Interfaces
{
    public record HashPasswordResponse(byte[] PasswordHash, byte[] PasswordSalt);
    public interface IHashService
    {
        HashPasswordResponse HashPassword(string password);
    }
}
