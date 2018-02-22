using Library.DataProcessing.Contracts.Validation;
using Library.DataStorage.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataProcessing.Contracts.DataServices
{
    public interface IGenericService<T> where T:IBaseEntity
    {
        IEnumerable<T> Get();
        IEntityResult<T> Post(T update);
        IEntityResult<T> Delete(T item);
    }
}
