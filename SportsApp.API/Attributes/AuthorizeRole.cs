using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using SportsApp.Domain.Enums;
using System.Data;

namespace SportsApp.API.Attributes
{
    public class AuthorizeRole : AuthorizeAttribute
    {
        public AuthorizeRole(UserRole userRole)
        {
            Roles = userRole.ToString();
            AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme;
        }
    }
}
