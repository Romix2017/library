using System;
using System.Collections.Generic;
using System.Text;
using D = System.ComponentModel.DescriptionAttribute;
namespace Library.DataTransferObjects.Enum
{
    [D("Role codes")]
    public enum AppRoleCode
    {
        [D("Manager")]
        Manager,

        [D("Librarian")]
        Librarian,
    }
}


