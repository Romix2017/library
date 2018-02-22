using Library.Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataProcessing.Contracts.DataServices
{
    public interface IBookHistoryService
    {
        IEnumerable<BookHistory> Get();
        void Post(BookHistory update);
    }
}
