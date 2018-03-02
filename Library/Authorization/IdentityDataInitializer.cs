using Library.DataTransferObjects.Enum;
using Library.Entities.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Library.Authorization
{
    public static class IdentityDataInitializer
    {
        public static void SeedUsers(UserManager<User> userManager)
        {
            if (userManager.FindByNameAsync("manager").Result == null)
            {
                User user = new User();
                user.UserName = "manager";
                user.Email = "manager@localhost";
                user.FirstName = "Nancy";
                user.LastName = "Marko";
                user.RoleCode = AppRoleCode.Manager;
                IdentityResult result = userManager.CreateAsync
                (user, "Liga123456!").Result;
            }


            if (userManager.FindByNameAsync("librarian").Result == null)
            {
                User user = new User();
                user.UserName = "librarian";
                user.Email = "librarian@localhost";
                user.FirstName = "Mark";
                user.LastName = "Johnson";
                user.RoleCode = AppRoleCode.Librarian;
                IdentityResult result = userManager.CreateAsync
                (user, "Liga123456!").Result;
            }
        }
    }
}
