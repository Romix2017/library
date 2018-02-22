using Library.DataStorage.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Library.DataProcessing.Contracts.Validation
{
    public interface IEntityResult<T> where T : IBaseEntity
    {
        T Entity { get; }
        IEnumerable<IValidationError> Errors { get; }
    }
}
