using Microsoft.EntityFrameworkCore;
using SportsApp.Domain.Entities;

namespace SportsApp.Infrastructure.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Video> Videos { get; set; }
    }
}
