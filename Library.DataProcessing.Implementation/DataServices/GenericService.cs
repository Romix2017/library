using Library.DataProcessing.Contracts.DataServices;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Logging;
using Library.Entities.Models;
using Library.DataStorage.Contracts;
using Library.DataProcessing.Contracts.Validation;
using Library.Extensions;
using Library.DataProcessing.Implementation.Validation;
using Library.DataProcessing.Implementation.Helpers;

namespace Library.DataProcessing.Implementation.DataServices
{
    class GenericService<T>: IGenericService<T> where T: IBaseEntity
    {
        private readonly ILogger logger;
        private readonly IRepository<T> repository;
        public GenericService(ILogger<T> logger, IRepository<T> repository)
        {
            this.logger = logger;
            this.repository = repository;
        }
        public IEnumerable<T> Get()
        {
            return repository.Get();
        }

        public IEntityResult<T> Post(T item)
        {
            using (logger.BeginScope(item))
            {
                logger.LogInformation(nameof(Post));
                var validations = new List<IValidationError>();
               
                    repository.CaptureErrors(
                        r => r.AddOrUpdate(new[] { item }), validations);
                return new EntityResult<T>(item, validations);
            }

        }

        public IEntityResult<T> Delete(T item)
        {
            using (logger.BeginScope(item))
            {
                logger.LogInformation(nameof(Post));
                var validations = new List<IValidationError>();

                repository.CaptureErrors(
                    r => r.Remove(item), validations);
                return new EntityResult<T>(item, validations);
            }
        }


    }
}
