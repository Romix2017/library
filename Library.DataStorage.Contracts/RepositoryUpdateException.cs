using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataStorage.Contracts
{
    public abstract class RepositoryUpdateException : Exception
    {
        public DateTime Timestamp { get; } = DateTime.UtcNow;

        public RepositoryUpdateException(string msg, Exception inner) : base(msg, inner)
        {
        }

        public override string ToString()
        {
            return $"REPOEX  @{Timestamp} : {base.ToString()}";
        }
    }
}
