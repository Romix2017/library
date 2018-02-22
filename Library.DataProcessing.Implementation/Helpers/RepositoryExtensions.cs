using Library.DataProcessing.Contracts.Validation;
using Library.DataProcessing.Implementation.Validation;
using Library.DataStorage.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Library.DataProcessing.Implementation.Helpers
{
    public static class RepositoryExtensions
    {
        public static IEnumerable<IValidationError> CaptureErrors<T>(this IRepository<T> repo,
        Action<IRepository<T>> repoAction, IEnumerable<IValidationError> concatTo)
        {
            concatTo = concatTo ?? Enumerable.Empty<IValidationError>();
            try
            {
                repoAction(repo);
                return concatTo;
            }
            catch (RepositoryUpdateException rpUpEx)
            {
                return concatTo.Concat(new[]
                {
                    new ValidationError
                    {
                        Code = "DB",
                        Description = $"DB Update Exception, timestamp {rpUpEx.Timestamp}"
                    }
                });
            }
        }

        public static IEnumerable<IValidationError> CaptureErrors<T>(this IRepository<T> repo,
            Action<IRepository<T>> repoAction, params IValidationError[] concatTo)
        {
            return CaptureErrors(repo, repoAction, concatTo.AsEnumerable());
        }
    }
}
