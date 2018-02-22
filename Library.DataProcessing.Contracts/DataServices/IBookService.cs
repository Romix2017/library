using System;
using System.Collections.Generic;
using System.Text;
using Library.Entities.Models;

namespace Library.DataProcessing.Contracts.DataServices
{
    public interface IBookService
    {
        IEnumerable<Book> Get();
        void Post(Book update);
    }
}
