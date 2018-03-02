using Library.DataTransferObjects.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataTransferObjects.Dto
{
    public class UserDto : BaseDto
    {
        public string UserName { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public AppRoleCode RoleCode { get; set; }

        public string Password { get; set; }

    }
}
