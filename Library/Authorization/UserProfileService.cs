using IdentityServer4.Models;
using IdentityServer4.Services;
using Library.Entities.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Library.Authorization
{
    public class UserProfileService : IProfileService
    {
        private readonly UserManager<User> userManager;

        public UserProfileService(UserManager<User> userManager)
        {
            this.userManager = userManager;
        }


        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var user = userManager.GetUserAsync(context.Subject).Result;

            context.IssuedClaims.AddRange(new[]
            {
                new Claim(CustomClaims.UserNameClaim, user.UserName.ToString() ?? default(int).ToString())
            });

            return Task.CompletedTask;
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            context.IsActive = userManager.GetUserAsync(context.Subject).Result != default(User);
            return Task.CompletedTask;
        }
    }
}
