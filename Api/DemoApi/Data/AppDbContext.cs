using DemoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DemoApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Ticket> Tickets { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsUnicode(true);    

                entity.Property(e => e.Desc)
                    .IsUnicode(true);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
