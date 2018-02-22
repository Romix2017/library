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
                .AddAutoMapper()
                .AddMvc();

            services
                .AddAuthentication(o =>
                {
                    o.DefaultScheme =
                    o.DefaultAuthenticateScheme = IdentityServerAuthenticationDefaults.AuthenticationScheme;

                })
                .AddIdentityServerAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme, o =>
                {
                    o.Authority = Configuration["Tokens: Authority"];
                    o.ApiName = "api1";
                    o.SupportedTokens = SupportedTokens.Both;
                    o.RequireHttpsMetadata = false;
                });

            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryPersistedGrants()
                .AddInMemoryApiResources(IdentityServerConfig.GetApiResources())
                .AddInMemoryClients(IdentityServerConfig.GetClients())
                .AddAspNetIdentity<User>()
                .AddProfileService<UserProfileService>();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("AllowAll");


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseIdentityServer();



            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });


          
        }
    }
}
