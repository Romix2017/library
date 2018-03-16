using System;
using System.Collections.Generic;
using System.Text;
using Library.DataStorage.Contracts;

namespace Library.Entities.Models
{
    public class LibraryUser : IBaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}




