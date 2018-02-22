using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataStorage.Contracts
{
    public interface IBaseEntity : IBaseEntity<int>
    {
    }

    public interface IBaseEntity<TKey>
    {
        TKey Id { get; set; }
    }
}
