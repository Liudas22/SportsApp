using Microsoft.IdentityModel.Tokens;
using SportsApp.Core.DTO;
using SportsApp.Core.Interfaces;
using SportsApp.Domain.Entities;
using SportsApp.Infrastructure.AppSettings;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SportsApp.Infrastructure.Services
{
    public class JwtService : IJwtService
    {
        private readonly JwtSettings _jwtSettings;

        private const string HashAlgorithm = SecurityAlgorithms.HmacSha256Signature;
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly SymmetricSecurityKey _securityKey;

        public JwtService(JwtSettings jwtSettings)
        {
            _jwtSettings = jwtSettings;
            _tokenHandler = new JwtSecurityTokenHandler();
            _securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtSettings.Secret));
        }

        public JwtDto BuildJwt(User user)
        {
            var tokenDescriptor = CreateAccessTokenDescriptor(user);
            var securityToken = _tokenHandler.CreateToken(tokenDescriptor);

            return new JwtDto
            {
                AccessToken = _tokenHandler.WriteToken(securityToken),
            };
        }
        private SecurityTokenDescriptor CreateAccessTokenDescriptor(User user)
        {
            var claims = new List<Claim>
        {
            new(ClaimTypes.Sid, user.Id.ToString()),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(ClaimTypes.Role, user.Role.ToString()),
            new(ClaimTypes.Name, user.Name),
        };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.Add(_jwtSettings.TokenLifetime),
                SigningCredentials = new SigningCredentials(_securityKey, HashAlgorithm),
            };

            return tokenDescriptor;
        }
    }
}
