using Library.DataStorage.EF.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Library.Entities.Models;
using Library.DataStorage.Contracts;

namespace Library.DataStorage.EF
{
    public static class EFStorageServiceCollectionExtensions
    {
        public static IServiceCollection AddLibraryContext(this IServiceCollection services, string connectionString)

        {
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));
            services.AddIdentity<User, Role>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();
            return services;
        }

        public static IServiceCollection AddEFDataStorage(this IServiceCollection services)
        {
            services.TryAddTransient(typeof(IRepository<>), typeof(EFRepository<>));
            services.TryAddTransient<IDataStorageControl, EFStorageControl>();
            return services;
        }
    }
}
