using Library.DataTransferObjects.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataTransferObjects.Filters
{
    public class UserFilterDto
    {
        public int? UserId { get; set; }
        public string PartialName { get; set; }
        public AppRoleCode? RoleCode { get; set; }
    }
}
