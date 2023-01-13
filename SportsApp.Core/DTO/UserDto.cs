using SportsApp.Domain.Enums;

namespace SportsApp.Domain.Models.DTO
{
    public class UserDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public UserRole Role { get; set; }
    }
}
