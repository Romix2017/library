using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Library.Extensions
{
    public static class DictionaryExtensions
    {

        public static IReadOnlyDictionary<T2, IEnumerable<T1>> InvertCollectionDictionary<T1, T2>(this IReadOnlyDictionary<T1, IEnumerable<T2>> input)
        {
            return input
                .SelectMany(p => p.Value)
                .Distinct()
                .ToDictionary(p => p, p => input.Where(kv => kv.Value.Contains(p)).Select(kv => kv.Key).ToArray() as IEnumerable<T1>);
        }

    }
}
