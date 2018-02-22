using Library.DataStorage.Contracts;
using Library.DataStorage.EF.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Library.Entities.Models;

namespace Library.DataStorage.EF
{
    class EFStorageControl : IDataStorageControl
    {
        private readonly ApplicationDbContext dbContext;

        public EFStorageControl(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void Init()
        {
            if (!AllMigrationsApplied(dbContext))
            {
                dbContext.Database.Migrate();
            }
        }

        private static bool AllMigrationsApplied(DbContext context)
        {
            var applied = context.GetService<IHistoryRepository>()
                .GetAppliedMigrations()
                .Select(m => m.MigrationId);

            var total = context.GetService<IMigrationsAssembly>()
                .Migrations
                .Select(m => m.Key);

            return !total.Except(applied).Any();
        }

    }
}
