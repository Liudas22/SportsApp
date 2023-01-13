using SportsApp.Core.DTO;
using SportsApp.Domain.Entities;

namespace SportsApp.Core.Interfaces
{
    public interface IJwtService
    {
        public JwtDto BuildJwt(User user);
    }
}
