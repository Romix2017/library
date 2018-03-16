using Library.DataStorage.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.Entities.Models
{
    public class BookHistory : IBaseEntity
    {
        public int Id { get; set; }
        public virtual Book Book { get; set; }
        public int BookId { get; set; }
        public DateTime DateGiven { get; set; }
        public DateTime? DateReturned { get; set; }
        public virtual LibraryUser LibraryUser { get; set; }
        public int? LibraryUserId { get; set; }
    }
}
