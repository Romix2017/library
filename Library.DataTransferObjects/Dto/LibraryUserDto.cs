using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataTransferObjects.Dto
{
    public class LibraryUserDto : BaseDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
