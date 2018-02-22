using Library.DataStorage.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.Entities.Models
{
    public class Book : IBaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual Genre Genre { get; set; }
        public int GenreId { get; set; }
    }
}
