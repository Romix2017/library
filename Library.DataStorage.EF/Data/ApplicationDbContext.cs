using Library.Entities.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
namespace Library.DataStorage.EF.Data
{
    public class ApplicationDbContext : IdentityDbContext<User, Role, int>
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        private const int
            MAXBOOKLEN = 100,
            MAXGENRELEN = 100;

        private const string
               DATETIME2 = "datetime2";

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Book>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Genre);
                entity.Property(e => e.Name).HasMaxLength(MAXBOOKLEN);
            });

            builder.Entity<Genre>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).HasMaxLength(MAXGENRELEN);
            });

            builder.Entity<BookHistory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Book);
                entity.HasOne(e => e.User);
                entity.Property(e => e.DateGiven).HasColumnType(DATETIME2);
                entity.Property(e => e.DateReturned).HasColumnType(DATETIME2);
            });

        }

    }
}
