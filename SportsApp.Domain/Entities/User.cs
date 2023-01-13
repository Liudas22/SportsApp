using SportsApp.Domain.Enums;

namespace SportsApp.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public UserRole Role { get; set; } // 0 - Registered user. 1 - Coach. 2 - Admin 
    }
}
