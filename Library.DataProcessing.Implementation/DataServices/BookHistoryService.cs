using Library.DataProcessing.Contracts.DataServices;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Logging;
using Library.Entities.Models;
using Library.DataStorage.Contracts;

namespace Library.DataProcessing.Implementation.DataServices
{
    class BookHistoryService: IBookHistoryService
    {
        private readonly ILogger logger;
        private readonly IRepository<BookHistory> repository;
        public BookHistoryService(ILogger<BookHistory> logger, IRepository<BookHistory> repository)
        {
            this.logger = logger;
            this.repository = repository;
        }
        public IEnumerable<Book> Get()
        {
            return repository.Get();
        }

        public void Post(Book book)
        {
            using (logger.BeginScope(book))
            {
                logger.LogInformation(nameof(Post));

                repository.Add(book);
            }
        }
    }
}
