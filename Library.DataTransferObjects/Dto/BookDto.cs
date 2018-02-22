using Library.DataTransferObjects.Enum;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataTransferObjects.Dto
{
    public class BookDto : BaseDto
    {
        public string Name { get; set; }
        public int GenreId { get; set; }
    }
}
