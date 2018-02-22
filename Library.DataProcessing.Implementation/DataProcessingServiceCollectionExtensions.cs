using Library.DataProcessing.Contracts.DataServices;
using Library.DataProcessing.Implementation.DataServices;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataProcessing.Implementation
{
    public static class DataProcessingServiceCollectionExtensions
    {
        public static IServiceCollection AddDataProcessingServices(this IServiceCollection services)
        {
            services.AddScoped<IBookService, BookService>();
            services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));
            return services;
        }
    }
}
