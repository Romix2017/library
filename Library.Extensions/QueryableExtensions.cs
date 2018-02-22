using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Library.Extensions
{
    public static class QueryableExtensions
    {
        public static IQueryable<T> OptionalSkip<T>(this IQueryable<T> source, int? skip)
        {
            if (skip.HasValue && skip.Value != default(int))
            {
                return source.Skip(skip.Value);
            }
            else return source;
        }

        public static IQueryable<T> OptionalTake<T>(this IQueryable<T> source, int? take)
        {
            if (take.HasValue && take.Value != default(int))
            {
                return source.Take(take.Value);
            }
            else return source;
        }
    }
}
