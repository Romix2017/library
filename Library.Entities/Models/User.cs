using Library.DataStorage.Contracts;
using Library.DataTransferObjects.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
namespace Library.Entities.Models
{
    public class User : IdentityUser<int>, IBaseEntity
    {
        public AppRoleCode RoleCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
