using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Library.DataProcessing.Implementation;
using Library.DataStorage.EF;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using AutoMapper;
using IdentityServer4.AccessTokenValidation;
using Library.Entities.Models;
using Library.Authorization;
using Library.DataStorage.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using IdentityModel;
namespace Library
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
                                                                            .AllowAnyMethod()
                                                                            .AllowAnyHeader()
                                                                            .AllowCredentials()));

            services.AddLibraryContext(Configuration.GetConnectionString("DefaultConnection"));
            services.AddDataProcessingServices();

            services
                .AddEFDataStorage()
                .AddAutoMapper();

            services
             .AddAuthentication(o =>
             {
                 o.DefaultScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
                 o.DefaultAuthenticateScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;
             })
             .AddIdentityServerAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme, o =>
             {
                 o.Authority = Configuration["Tokens:Authority"];
                 o.ApiName = "api1";
                 o.SupportedTokens = SupportedTokens.Both;
                 o.RequireHttpsMetadata = false;
             });

            services.AddAuthorization(options => {

                foreach (var policy in Privileges.GetPrivilegePolicies())
                {
                    options.AddPolicy(policy.Key, policy.Value);
                    
                }
            });



            services.AddMvc();

            services.AddIdentityServer()
           .AddDeveloperSigningCredential()
           .AddInMemoryPersistedGrants()
           .AddInMemoryApiResources(IdentityServerConfig.GetApiResources())
           .AddInMemoryClients(IdentityServerConfig.GetClients())
           .AddAspNetIdentity<User>()
           .AddProfileService<UserProfileService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, UserManager<User> userManager)
        {
            app.UseCors("AllowAll");


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
                app.UseDatabaseErrorPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseIdentityServer();

            IdentityDataInitializer.SeedUsers(userManager);

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            // storage manipulations should be scoped
            using (var serviceScope = app.ApplicationServices
                .GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                serviceScope.ServiceProvider.GetService<IDataStorageControl>().Init();
            }

        }

    }
}
