using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataTransferObjects.Dto
{
    public class BookHistoryDto : BaseDto
    {
        public int BookId { get; set; }
        public DateTime DateGiven { get; set; }
        public DateTime DateReturned { get; set; }
        public int? LibraryUserId { get; set; }
        public string BookName { get; set; }
        public string LibraryUserName { get; set; }
    }
}
