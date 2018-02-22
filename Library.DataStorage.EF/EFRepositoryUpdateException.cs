using Library.DataStorage.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataStorage.EF
{
    class EFRepositoryUpdateException : RepositoryUpdateException
    {
        public EFRepositoryUpdateException(DbUpdateException dbUpEx) : base(dbUpEx.Message, dbUpEx)
        {
        }

        public DbUpdateConcurrencyException DbUpEx { get; }
    }
}
