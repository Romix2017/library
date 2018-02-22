using Library.DataProcessing.Contracts.Validation;
using Library.DataStorage.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Library.DataProcessing.Implementation.Validation
{
    internal class EntityResult<T> : IEntityResult<T> where T : IBaseEntity
    {
        public EntityResult(T entity, params IValidationError[] errors)
           : this(entity, errors.AsEnumerable())
        {
        }

        public EntityResult(T entity, IEnumerable<IValidationError> errors)
        {
            Entity = entity;
            Errors = errors;
        }

        public T Entity { get; private set; }

        public IEnumerable<IValidationError> Errors { get; private set; }

        internal EntityResult<T> AttachSimpleError(string code, string error)
        {
            Errors = (Errors ?? Enumerable.Empty<IValidationError>())
                .Concat(new ValidationError[] { new ValidationError { Code = code, Description = error } });
            return this;
        }
    }
}
