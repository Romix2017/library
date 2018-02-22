using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace Library.DataStorage.Contracts
{
        public interface IRepository<T>
        {
            T Add(T entity);
            void AddRange(IEnumerable<T> entities);

            T Update(T entity);
            void UpdateRange(IEnumerable<T> entities);

            void AddOrUpdate(IEnumerable<T> entities, Func<T, bool> newIf = null);

            void Remove(T entity);
            void RemoveRange(IEnumerable<T> entities);

            int Count(Expression<Func<T, bool>> predicate = null);

            IQueryable<T> Get(Expression<Func<T, bool>> predicate = null);
        }
}
