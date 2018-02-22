using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Library.DataStorage.Contracts
{
    public interface IChangeSet<TEntity>
    {
        IEnumerable<TEntity> GetAdded();
        IEnumerable<TEntity> GetModified();
        IEnumerable<TEntity> GetDeleted();
        IEnumerable<TEntity> GetUnchanged();
        void Unmodify<TProperty>(TEntity entity, Expression<Func<TEntity, TProperty>> property);
        bool IsModified<TProperty>(TEntity entity, Expression<Func<TEntity, TProperty>> property);
    }
}
