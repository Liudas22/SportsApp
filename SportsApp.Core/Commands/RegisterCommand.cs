using SportsApp.Domain.Enums;

namespace SportsApp.Core.Commands
{
    public class RegisterCommand
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public UserRole Role { get; set; }
    }
}
