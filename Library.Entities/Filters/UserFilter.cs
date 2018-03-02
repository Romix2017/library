using Library.DataTransferObjects.Enum;
using Library.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Library.Entities.Filters
{
    public class UserFilter : BaseFilter<User>
    {
        public int? UserId { get; set; }
        public string PartialName { get; set; }
        public AppRoleCode? RoleCode { get; set; }

        public override (IQueryable<User> items, Lazy<int> total) ApplyTo(IQueryable<User> source)
        {
            if (!string.IsNullOrEmpty(PartialName))
            {
                var lower = PartialName.ToLower();
                source = source.Where(u =>
                    (u.FirstName + " " + u.LastName).ToLower().Contains(PartialName) ||
                    u.UserName.ToLower().Contains(PartialName));
            }

            if (RoleCode.HasValue)
            {
                source = source.Where(u => u.RoleCode == RoleCode.Value);
            }
            return base.ApplyTo(source);
        }
    }
}
