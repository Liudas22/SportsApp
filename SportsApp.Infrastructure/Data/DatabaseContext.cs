using Microsoft.EntityFrameworkCore;
using SportsApp.Domain.Models;

namespace SportsApp.Infrastructure.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}
