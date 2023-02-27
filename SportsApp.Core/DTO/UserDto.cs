using SportsApp.Domain.Enums;

namespace SportsApp.Domain.Models.DTO
{
    public class UserDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public UserRole Role { get; set; }
        public int Level { get; set; }
        public byte[] Avatar { get; set; }
    }
}