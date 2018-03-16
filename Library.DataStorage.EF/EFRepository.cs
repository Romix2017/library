using Library.DataStorage.Contracts;
using Library.DataStorage.EF.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Linq.Expressions;
using Library.Entities.Models;
using AutoMapper;

namespace Library.DataStorage.EF
{
    internal class EFRepository<T> : IRepository<T> where T : class, IBaseEntity
    {
        private readonly ApplicationDbContext dbContext;
        private readonly ILogger<EFRepository<T>> logger;
        private readonly DbSet<T> set;

        public EFRepository(ApplicationDbContext dbContext, ILogger<EFRepository<T>> logger)
        {
            this.dbContext = dbContext;
            this.logger = logger;
            set = dbContext.Set<T>();
        }

        public T Add(T entity)
        {
            try
            {
                var result = set.Add(entity).Entity;
                dbContext.SaveChanges();
                return result;
            }
            catch (DbUpdateException dbUpEx)
            {
                throw LogAndWrap(dbUpEx);
            }
        }


        public void AddOrUpdate(IEnumerable<T> entities, Func<T, bool> newIf = null)
        {
            AddRange(entities.Where(newIf ?? DefaultNewIf));
            UpdateRange(entities.Where(e => !(newIf ?? DefaultNewIf)(e)));
        }

        static bool DefaultNewIf(T entity) => entity.Id == default(int);

        public void AddRange(IEnumerable<T> entities)
        {
            try
            {
                set.AddRange(entities);
                dbContext.SaveChanges();
            }
            catch (DbUpdateException dbUpEx)
            {
                throw LogAndWrap(dbUpEx);
            }
        }


        public int Count(Expression<Func<T, bool>> predicate = null) => set.Count(predicate ?? (e => true));
        public IQueryable<T> Get(Expression<Func<T, bool>> predicate = null) => set.Where(predicate ?? (e => true));

        public void Remove(T entity)
        {
            try
            {
                var item = set.Where(x => entity.Id == x.Id).FirstOrDefault();

                if (item == null)
                {
                    set.Remove(entity);
                }
                else
                {
                    set.Remove(item);
                }

                dbContext.SaveChanges();
            }
            catch (DbUpdateException dbUpEx)
            {
                throw LogAndWrap(dbUpEx);
            }
        }


        public void RemoveRange(IEnumerable<T> entities)
        {
            try
            {
                set.RemoveRange(entities);
            }
            catch (DbUpdateException dbUpEx)
            {
                throw LogAndWrap(dbUpEx);
            }
        }


        public T Update(T entity)
        {
            try
            {
                var result = set.Update(entity).Entity;
                dbContext.SaveChanges();
                return result;
            }
            catch (DbUpdateException dbUpEx)
            {
                throw LogAndWrap(dbUpEx);
            }
        }

        public void UpdateRange(IEnumerable<T> entities)
        {
            try
            {
                set.UpdateRange(entities);
                dbContext.SaveChanges();
            }
            catch(DbUpdateException dbUpEx)
            {
                throw LogAndWrap(dbUpEx);
            }
        }


        private RepositoryUpdateException LogAndWrap(DbUpdateException dbUpEx)
        {
            var ex = new EFRepositoryUpdateException(dbUpEx);
            logger.LogError(ex, ex.Message);
            return ex;
        }
    }
}
