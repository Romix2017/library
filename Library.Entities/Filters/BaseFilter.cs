using Library.DataStorage.Contracts;
using Library.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Library.Extensions;

namespace Library.Entities.Filters
{
    public class BaseFilter<TKey, TIndex> where TIndex : struct
    {
        public IEnumerable<TKey> IDs { get; set; }
        public TIndex? Skip { get; set; }
        public TIndex? Take { get; set; }
    }

    public abstract class BaseFilter<T> : BaseFilter<int, int> where T : IBaseEntity
    {
        public virtual (IQueryable<T> items, Lazy<int> total) ApplyTo(IQueryable<T> source)
        {
            if (IDs != null && IDs.Any()) source = source.Where(e => IDs.Contains(e.Id));

            return (
                source.OptionalSkip(Skip).OptionalTake(Take), new Lazy<int>(() => source.Count()));
        }

        protected static IQueryable<T> SearchByString(string propertyName, IQueryable<T> source, string filter)
        {
            if ((propertyName != "" && !string.IsNullOrEmpty(filter)))
            {
                var lower = filter.ToLower();
                source = source.Where(u => (u.GetType().GetProperty(propertyName)
                    .GetValue(u) ?? "").ToString().ToLower().Contains(lower));
            }

            return source;
        }

        protected static IQueryable<T> SearchByStringRelation(string propertyName, IQueryable<T> source, string filter)
        {
            if ((propertyName != "" && !string.IsNullOrEmpty(filter)))
            {
                var lower = filter.ToLower();
                source = source.Where(u => (u.GetType().GetProperty(propertyName)
                    .GetValue(u) ?? "").ToString().ToLower().Contains(lower));
            }

            return source;
        }



    }
}
