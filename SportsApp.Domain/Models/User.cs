namespace SportsApp.Domain.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool IsLoggedIn { get; set; }
        public int Role { get; set; } // 0 - Registered user. 1 - Coach. 2 - Admin 
    }
}
