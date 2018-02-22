using Library.DataStorage.Contracts;
using Library.DataStorage.EF.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Library.DataStorage.EF
{
    internal class EFChangeSet<T>: IChangeSet<T> where T: class
    {
        private readonly ApplicationDbContext _dbContext;

        public EFChangeSet(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<T> GetAdded() => GetEntitiesWithState(EntityState.Added);

        public IEnumerable<T> GetDeleted() => GetEntitiesWithState(EntityState.Deleted);

        public IEnumerable<T> GetModified() => GetEntitiesWithState(EntityState.Modified);

        public IEnumerable<T> GetUnchanged() => GetEntitiesWithState(EntityState.Unchanged);

        public bool IsModified<TProperty>(T entity, Expression<Func<T, TProperty>> property)
        {
            return _dbContext.Entry(entity).Property(property).IsModified;
        }

        public void Unmodify<TProp>(T entity, Expression<Func<T, TProp>> property)
        {
            _dbContext.Entry(entity).Property(property).IsModified = false;
        }

        private IEnumerable<T> GetEntitiesWithState(EntityState state)
        {
            return _dbContext.ChangeTracker
                .Entries<T>()
                .Where(e => e.State == state)
                .Select(e => e.Entity);
        }
    }
}
